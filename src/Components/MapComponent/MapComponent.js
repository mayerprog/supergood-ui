import { useEffect, useRef, useState } from "react";
import styles from "./MapComponent.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import placeholder from "../../assets/images/placeholder.png";

const MapComponent = ({ mapWrapperRef }) => {
  const position = [55.7558, 37.6173]; //Moscow

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

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
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
