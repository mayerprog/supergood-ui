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
import pin from "../../assets/images/pin.png";
import axios from "axios";
import { addressAPI } from "../../api/addressAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, addPosition } from "../../redux/slices/addressSlice";
import AddressDropDown from "../Address/AddressDropDown/AddressDropDown";
import { fetchSuggestions } from "../../services/fetchSuggestions";

const MapComponent = ({ mapWrapperRef, setIsMapOpen }) => {
  const [multiPolygon, setmMultiPolygon] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [markerAddress, setMarkerAddress] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapPosition, setMapPosition] = useState([0, 0]);
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  // const polyLayers = useSelector((state) => state.address.polyLayers);
  const position = useSelector((state) => state.address.position);
  const address = useSelector((state) => state.address.address);

  useEffect(() => {
    setInputAddress(address);
    setMarkerAddress(address);
    if (position) setMapPosition(position);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await addressAPI.getPoly();
        const polygonArray = [];
        const polyMap = new Map();

        // const polyValuesState = Object.values(polyLayers);
        const points = data.points;
        const polyValues = [];

        points.forEach((item) => {
          const value = Object.values(item)[0];
          polyValues.push(value);
        });

        for (let i = 0; i < polyValues.length; i++) {
          if (polyMap.has(polyValues[i].dept_id)) {
            polyMap
              .get(polyValues[i].dept_id)
              .push([polyValues[i].latitude, polyValues[i].longtitude]);
          } else {
            polyMap.set(polyValues[i].dept_id, []);
          }
        }
        // push arrays of points to polygonArray
        for (let item of polyMap.values()) {
          polygonArray.push(item);
        }
        setmMultiPolygon(polygonArray);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const axiosConfig = {
      timeout: 10000,
    };

    try {
      const response = await axios.get(url, axiosConfig);
      if (response.data) {
        const data = response.data;
        setInputAddress(data.display_name);
        setMarkerAddress(data.display_name);
      }
      //   const address = await addressAPI.postAddress(lat, lng);
      //   console.log(address, "address");
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  // const fetchSuggestions = async (input) => {
  //   if (!input) {
  //     setSuggestions([]);
  //     setShowDropdown(false);
  //     return;
  //   }

  //   const axiosConfig = {
  //     timeout: 10000,
  //   };

  //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //     input
  //   )}`;

  //   try {
  //     const response = await axios.get(url, axiosConfig);
  //     if (response.data) {
  //       const data = response.data;
  //       setSuggestions(data);
  //       setShowDropdown(true);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch suggestions:", error);
  //   }
  // };

  // const fetchCoordinatesForAddress = async (address) => {
  //   const axiosConfig = {
  //     timeout: 10000,
  //   };
  //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //     address
  //   )}`;
  //   try {
  //     const response = await axios.get(url, axiosConfig);
  //     console.log("response", response.data);
  //     if (response.data && response.data[0]) {
  //       const { lat, lon } = response.data[0];
  //       const newPosition = [parseFloat(lat), parseFloat(lon)];
  //       setMapPosition(newPosition);
  //       setMarkerAddress(address);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch coordinates:", error);
  //   }
  // };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapPosition([lat, lng]);
        fetchAddress(lat, lng);
        console.log([lat, lng]);
      },
    });
    return null; // the component is only for side effects, it doesn't render anything
  };

  const handleAddress = () => {
    dispatch(setAddress(inputAddress));
    dispatch(addPosition(mapPosition));
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
            setMapPosition={setMapPosition}
            setMarkerAddress={setMarkerAddress}
            // fetchCoordinatesForAddress={fetchCoordinatesForAddress}
          />
        )}
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
        <Marker position={mapPosition} icon={customIcon}>
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
