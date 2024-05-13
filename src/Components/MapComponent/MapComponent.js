import { useContext, useEffect, useState } from "react";
import styles from "./MapComponent.module.scss";
import { IoMdClose } from "react-icons/io";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import { Icon } from "leaflet";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import { addressAPI } from "../../api/addressAPI";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, setMapPosition } from "../../redux/slices/userSlice";
import AddressDropDown from "../Address/AddressDropDown/AddressDropDown";
import { fetchSuggestions } from "../../services/fetchSuggestions";
import { fetchCoordinatesForAddress } from "../../services/fetchCoordinatesForAddress";
import { makeExistingAddressSelected } from "../../services/makeExistingAddressSelected";
import { useMediaQuery } from "react-responsive";
import LevelContext from "../../contexts/LevelContext";

const MapComponent = ({ mapWrapperRef, setIsMapOpen }) => {
  const [multiPolygon, setmMultiPolygon] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [addressData, setAddressData] = useState(null);

  const { markerAddress, markerPosition, setMarkerAddress, setMarkerPosition } =
    useContext(LevelContext);

  const dispatch = useDispatch();

  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  // const polyLayers = useSelector((state) => state.user.polyLayers);
  const addressSelected = useSelector((state) => state.user.addressSelected);
  const addressList = useSelector((state) => state.user.addressList);
  const mapPosition = useSelector((state) => state.user.mapPosition);

  useEffect(() => {
    setInputAddress(addressSelected);
  }, [addressSelected]);

  useEffect(() => {
    (async () => {
      try {
        const data = await addressAPI.getPoly();

        const polygonArray = [];
        const polyMap = new Map();

        const points = data.points;

        const polyValues = Object.values(points);

        for (let i = 0; i < polyValues.length; i++) {
          if (polyMap.has(polyValues[i].dept_id)) {
            polyMap
              .get(polyValues[i].dept_id)
              .push([polyValues[i].latitude, polyValues[i].longitude]);
          } else {
            polyMap.set(polyValues[i].dept_id, []);
          }
        }
        // push arrays of points to polygonArray
        for (let item of polyMap.values()) {
          polygonArray.push(item);
        }
        // console.log("polyMap", polyMap);
        setmMultiPolygon(polygonArray);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const fetchAddress = async (lat, lng) => {
    // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    // const axiosConfig = {
    //   timeout: 10000,
    // };

    try {
      // const response = await axios.get(url, axiosConfig);
      const response = await addressAPI.getAddress(lat, lng);

      if (response) {
        const data = Object.values(response.streets)[0];
        console.log("data", data);

        setInputAddress(`${data.street}, ${data.yhouse}`);
        setMarkerAddress(`${data.street}, ${data.yhouse}`);
        setAddressData(data);
        setIsAddressValid(true);
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
      alert("Не удалось определить точный адрес");
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        dispatch(setMapPosition([lat, lng]));
        setMarkerPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });
    return null; // the component is only for side effects, it doesn't render anything
  };

  const handleAddress = () => {
    if (!isAddressValid) {
      return; // Stop the function if the address is not validated
    }
    const addressExists = addressList.some(
      (item) => `${item.street}, ${item.yhouse}` === inputAddress
    );
    if (addressExists) {
      //if exists just make it selected
      makeExistingAddressSelected(addressList, inputAddress, dispatch);
    } else {
      // if does not exist then add to the addressList
      dispatch(addAddress({ data: addressData, selected: true }));
    }
    setIsMapOpen(false);
  };

  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  const orangeptions = { color: "orange" };

  return (
    <div className={styles.mapContainer} ref={mapWrapperRef}>
      <div onClick={() => setIsMapOpen(false)} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <h3>Наша территория доставки</h3>
      <div className={styles.addressContainer}>
        <input
          className={styles.input}
          placeholder="Укажите адрес доставки (улица, номер дома)"
          value={inputAddress}
          onChange={(e) => {
            setInputAddress(e.target.value);
            fetchSuggestions(e.target.value, setSuggestions, setShowDropdown);
          }}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Hide dropdown when not focused; delay to allow click event to register
        />
        {showDropdown && (
          <AddressDropDown
            setShowDropdown={setShowDropdown}
            setInputAddress={setInputAddress}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            dispatch={dispatch}
            setMarkerAddress={setMarkerAddress}
            setMarkerPosition={setMarkerPosition}
            setIsAddressValid={setIsAddressValid}
            isModal={true}
          />
        )}
        <button className={styles.buttonStyle} onClick={handleAddress}>
          <span className={styles.buttonText}>Подтвердить</span>
        </button>
      </div>
      <MapContainer
        center={netbooksMediaQuery ? mapPosition : [55.7558, 37.6173]}
        zoom={netbooksMediaQuery ? 16 : 10}
        attributionControl={false}
        className={styles.map}
        zoomControl={false}
        minZoom={10}
      >
        <TileLayer url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>{markerAddress}</Popup>
        </Marker>
        <MapEvents />
        <ZoomControl position="topleft" zoomInText="+" zoomOutText="-" />
        <Polygon pathOptions={orangeptions} positions={multiPolygon} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
