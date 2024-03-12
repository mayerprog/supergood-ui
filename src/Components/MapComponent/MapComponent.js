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
import axios from "axios";
import { addressAPI } from "../../api/addressAPI";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MapComponent = ({ mapWrapperRef }) => {
  const [position, setPosition] = useState([0, 0]);
  const [address, setAddress] = useState("");
  const [multiPolygon, setmMltiPolygon] = useState([]);

  const polyLayers = useSelector((state) => state.address.polyLayers);

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
      setAddress(data.display_name);
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
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });
    return null; // the component is only for side effects, it doesn't render anything
  };

  const customIcon = new Icon({
    iconUrl: placeholder,
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
          value={address}
          onChange={() => console.log("something")}
        />
        <button className={styles.buttonStyle}>
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
        <TileLayer
          url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>{address}</Popup>
        </Marker>
        <MapEvents />
        <ZoomControl position="topleft" zoomInText="+" zoomOutText="-" />
        <Polygon pathOptions={orangeptions} positions={multiPolygon} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
