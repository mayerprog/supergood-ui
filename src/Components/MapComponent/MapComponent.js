import { useEffect, useRef, useState } from "react";
import styles from "./MapComponent.module.scss";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj";

const MapComponent = () => {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (ref.current && !mapRef.current) {
      //!mapRef.current means the map has not yet been initialized and stored in mapRef. This effectively prevents re-initializing the map if the component re-renders.
      mapRef.current = new Map({
        target: ref.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([37.6173, 55.7558]), // Coordinates for Moscow, adjust accordingly
          zoom: 12,
        }),
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(12);
  }, [mapRef]);
  return (
    <div className={styles.mapContainer}>
      <div ref={ref} className={styles.map}></div>
    </div>
  );
};

export default MapComponent;
