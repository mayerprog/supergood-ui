import { useEffect, useRef, useState } from "react";
import styles from "./MapComponent.module.scss";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import L, { Icon } from "leaflet";
import placeholder from "../../assets/images/placeholder.png";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import { addressAPI } from "../../api/addressAPI";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, setPosition } from "../../redux/slices/addressSlice";

const MapComponent = ({ mapWrapperRef, setIsMapOpen }) => {
  const [multiPolygon, setmMltiPolygon] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  // const [onChangeAddress, setOnChangeAddress] = useState(null); //для onchange и выпадающего списка
  const dispatch = useDispatch();

  const polyLayers = useSelector((state) => state.address.polyLayers);
  const position = useSelector((state) => state.address.position);
  const address = useSelector((state) => state.address.address);

  useEffect(() => {
    setInputAddress(address);
  }, []);

  useEffect(() => {
    const polygonArray = [];
    const polyMap = new Map();

    const polyValues = Object.values(polyLayers);
    for (let i = 0; i < polyValues.length; i++) {
      if (polyMap.has(polyValues[i].dept_id)) {
        polyMap
          .get(polyValues[i].dept_id)
          .push([polyValues[i].latitude, polyValues[i].longitude]);
      } else {
        polyMap.set(polyValues[i].dept_id, []);
      }
    }
    for (let item of polyMap.values()) {
      polygonArray.push(item);
    }
    setmMltiPolygon(polygonArray);
  }, [polyLayers]);

  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const axiosConfig = {
      timeout: 10000,
    };

    try {
      const response = await axios.get(url, axiosConfig);
      const data = response.data;
      setInputAddress(data.display_name);
      console.log("Address:", data);
      //   const address = await addressAPI.postAddress(lat, lng);
      //   console.log(address, "address");
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        dispatch(setPosition([lat, lng]));
        fetchAddress(lat, lng);
      },
    });
    return null; // the component is only for side effects, it doesn't render anything
  };

  const handleAddress = () => {
    dispatch(addAddress(inputAddress));
    setIsMapOpen(false);
  };

  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  const orangeptions = { color: "orange" };

  return (
    <div className={styles.mapContainer} ref={mapWrapperRef}>
      <h3>Наша территория доставки</h3>
      <div className={styles.addressContainer}>
        <input
          className={styles.input}
          placeholder="Укажите адрес доставки (улица, номер дома)"
          value={inputAddress ? inputAddress : address}
          // onChange={(inputAddress) => dispatch(setAddress(inputAddress))}
          onChange={() => console.log("inputAddress")}
        />
        <button className={styles.buttonStyle} onClick={handleAddress}>
          <span className={styles.buttonText}>Подтвердить</span>
        </button>
      </div>
      <MapContainer
        center={[55.7558, 37.6173]}
        zoom={11}
        attributionControl={false}
        className={styles.map}
        zoomControl={false}
        minZoom={10}
      >
        <TileLayer url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>{inputAddress}</Popup>
        </Marker>
        <MapEvents />
        <ZoomControl position="topleft" zoomInText="+" zoomOutText="-" />
        <Polygon pathOptions={orangeptions} positions={multiPolygon} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
