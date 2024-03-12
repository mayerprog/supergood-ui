import { useEffect, useRef, useState } from "react";
import styles from "./MapComponent.module.scss";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { Icon } from "leaflet";
import placeholder from "../../assets/images/placeholder.png";
import axios from "axios";
import { addressAPI } from "../../api/addressAPI";

const MapComponent = ({ mapWrapperRef }) => {
  const [position, setPosition] = useState([55.7558, 37.6173]); // Initial position for Moscow
  const [address, setAddress] = useState(null);

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
      // const address = await addressAPI.postAddress(
      //   marker.getLatLng().lat,
      //   marker.getLatLng().lng
      // );
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

  return (
    <div className={styles.mapContainer} ref={mapWrapperRef}>
      <MapContainer
        center={position}
        zoom={12}
        attributionControl={false}
        className={styles.map}
      >
        <TileLayer
          url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>{address}</Popup>
        </Marker>
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
