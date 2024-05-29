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
import { addressAPI } from "../../api/addressAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  setAddressList,
  setMapPosition,
} from "../../redux/slices/userSlice";
import { fetchSuggestionsStreet } from "../../services/fetchSuggestionsStreet";
import { makeExistingAddressSelected } from "../../services/makeExistingAddressSelected";
import { useMediaQuery } from "react-responsive";
import AddressContext from "../../contexts/AddressContext";
import { fetchHousesSuggestions } from "../../services/fetchHousesSuggestions";
import HouseDropDown from "../Address/HouseDropDown/HouseDropDown";
import StreetDropDown from "../Address/StreetDropDown/StreetDropDown";
import { useUpdateStreetid } from "../../hooks/useUpdateStreetid";
import { useGetPoly } from "../../hooks/useGetPoly";
import { userAPI } from "../../api/userAPI";

const MapComponent = ({ mapWrapperRef, setIsMapOpen }) => {
  const [multiPolygonPoly, setmMultiPolygonPoly] = useState([]);
  const [multiPolygonPolyFew, setmMultiPolygonPolyFew] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputHouse, setInputHouse] = useState("");
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);
  const [showHouseDropdown, setShowHouseDropdown] = useState(false);
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [houseSuggestions, setHouseSuggestions] = useState([]);

  const {
    markerAddress,
    markerPosition,
    setMarkerAddress,
    setMarkerPosition,
    streetid,
    setStreetid,
    addressData,
    setAddressData,
  } = useContext(AddressContext);

  const dispatch = useDispatch();

  const netbooksMediaQuery = useMediaQuery({ maxWidth: 1024 });

  const addressSelected = useSelector((state) => state.user.addressSelected);
  const addressList = useSelector((state) => state.user.addressList);
  const mapPosition = useSelector((state) => state.user.mapPosition);
  const token = useSelector((state) => state.user.token);
  const floor = useSelector((state) => state.user.floor);
  const flat = useSelector((state) => state.user.flat);
  const entrance = useSelector((state) => state.user.entrance);
  const description = useSelector((state) => state.user.description);
  const isAuth = useSelector((state) => state.auth.isAuth);

  // to put street and house names from selected address in all input fields
  useEffect(() => {
    setInputAddress(addressSelected);
    setInputStreet(addressSelected.street);
    setInputHouse(addressSelected.yhouse);
  }, []);

  //this useEffect must define streetid for changing house number input if needed
  const selectedStreet = addressSelected.street;

  useUpdateStreetid(selectedStreet, setStreetid);
  useGetPoly(setmMultiPolygonPoly, 0);
  useGetPoly(setmMultiPolygonPolyFew, 1);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await addressAPI.getAddress(lat, lng);

      if (response) {
        const data = Object.values(response.streets)[0];
        setInputStreet(data.street);
        setInputHouse(data.yhouse);
        setInputAddress(`${data.street}, ${data.yhouse}`);
        setMarkerAddress(`${data.street}, ${data.yhouse}`);
        setAddressData(data);
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

  const handleAddress = async () => {
    try {
      const response = await addressAPI.saveAddress({
        token: token,
        street: addressData.street,
        lat: addressData.lat,
        long: addressData.long,
        addressid: addressData.addressid,
        streetid: addressData.streetid,
        houseid: addressData.houseid,
        entrance: entrance,
        floor: floor,
        flat: flat,
        description: description,
        selected: true,
      });
      if (response.status === "ok") {
        const addressExists = addressList.some(
          (item) => `${item.street}, ${item.yhouse}` === inputAddress
        );
        if (addressExists) {
          //if exists just make it selected
          makeExistingAddressSelected(addressList, inputAddress, dispatch);
        } else {
          // if does not exist then just add to the addressList
          if (!isAuth) {
            dispatch(addAddress({ data: addressData, selected: true }));
          } else {
            const data = await userAPI.getUserPref(token);
            dispatch(setAddressList(Object.values(data.address)));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    setIsMapOpen(false);
  };

  const customIcon = new Icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  const orangeOptions = { color: "orange" };
  const blueOptions = { color: "#44a5bf" };

  return (
    <div className={styles.mapContainer} ref={mapWrapperRef}>
      <div onClick={() => setIsMapOpen(false)} className={styles.icon}>
        <IoMdClose size={25} />
      </div>
      <h3>Наша территория доставки</h3>
      <div className={styles.addressContainer}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Укажите улицу"
            value={inputStreet}
            onChange={(e) => {
              setInputStreet(e.target.value);
              fetchSuggestionsStreet(
                e.target.value,
                setStreetSuggestions,
                setShowStreetDropdown
              );
            }}
            onFocus={() =>
              streetSuggestions.length > 0 && setShowStreetDropdown(true)
            }
            onBlur={() => setTimeout(() => setShowStreetDropdown(false), 100)} // Hide dropdown when not focused; delay to allow click event to register
          />
          {showStreetDropdown && (
            <StreetDropDown
              setShowStreetDropdown={setShowStreetDropdown}
              setShowHouseDropdown={setShowHouseDropdown}
              setInputStreet={setInputStreet}
              suggestions={streetSuggestions}
              setHouseSuggestions={setHouseSuggestions}
              isModal={false}
              setStreetid={setStreetid}
            />
          )}
        </div>
        <div className={styles.houseInputContainer}>
          <input
            className={styles.inputHouse}
            placeholder="Дом"
            value={inputHouse}
            onChange={(e) => {
              setInputHouse(e.target.value);
              fetchHousesSuggestions(
                e.target.value,
                setHouseSuggestions,
                setShowHouseDropdown,
                streetid
              );
            }}
            onFocus={() =>
              houseSuggestions.length > 0 && setShowHouseDropdown(true)
            }
            onBlur={() => setTimeout(() => setShowHouseDropdown(false), 100)}
          />
          {showHouseDropdown && (
            <HouseDropDown
              setShowHouseDropdown={setShowHouseDropdown}
              setInputHouse={setInputHouse}
              suggestions={houseSuggestions}
              setSuggestions={setHouseSuggestions}
              dispatch={dispatch}
              setMarkerAddress={setMarkerAddress}
              setMarkerPosition={setMarkerPosition}
              isModal={false}
              setAddressData={setAddressData}
              setInputAddress={setInputAddress}
            />
          )}
        </div>
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
        <Polygon pathOptions={orangeOptions} positions={multiPolygonPoly} />
        <Polygon pathOptions={blueOptions} positions={multiPolygonPolyFew} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
