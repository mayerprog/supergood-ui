import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  addressSelected: "",
  mapPosition: [55.7558, 37.6173],
  addressList: [
    {
      houseid: 5320618,
      streetid: 12272,
      name: "Строгинский бульвар",
      street: "Строгинский бульвар",
      yhouse: "5",
      house: "5",
      build: "",
      struct: null,
      lat: 55.805341,
      long: 37.398994,
      socrname: "",
      inpoly: true,
      dept_id: 1374,
      deptid: 1374,
      addressid: 210167,
      flat: "",
      floor: "",
      entrance: "",
      description: "",
      rectype: 1,
      selected: true,
      minor_area_id: "1176",
    },
    {
      houseid: 5693005,
      streetid: 12499,
      name: "2-я Лыковская улица",
      street: "2-я Лыковская улица",
      yhouse: "35с2",
      house: "35",
      build: "",
      struct: "2",
      lat: 55.782638,
      long: 37.393425,
      socrname: "",
      inpoly: true,
      dept_id: 1374,
      deptid: 1374,
      addressid: 210153,
      flat: "",
      floor: "",
      entrance: "",
      description: "",
      rectype: 1,
      selected: false,
      minor_area_id: "1173",
    },
    {
      houseid: 1016009,
      streetid: 2709,
      name: "улица Бутырский Вал",
      street: "улица Бутырский Вал",
      yhouse: "68/70с4",
      house: "68/70",
      build: "",
      struct: "4",
      lat: 55.788125,
      long: 37.589248,
      socrname: "",
      inpoly: true,
      dept_id: 1257,
      deptid: 1257,
      addressid: 210152,
      flat: "",
      floor: "",
      entrance: "",
      description: "",
      rectype: 1,
      selected: false,
      minor_area_id: "1133",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    setMapPosition: (state, action) => {
      state.mapPosition = action.payload;
    },
    setAddressSelected: (state, action) => {
      state.addressSelected = action.payload;
    },
    removeAddressSelected: (state, action) => {
      state.addressSelected = "";
    },
    addAddress: (state, action) => {
      const { data, selected } = action.payload;

      //if new address selected=true, then make all old addresses selected false
      if (selected) {
        state.addressList.forEach((item) => {
          item.selected = false;
        });
      }
      //to add new address to addressList
      state.addressList = [
        ...state.addressList,
        {
          ...data, // Spread the existing properties of data
          selected: selected, // Add the selected property
        },
      ];
    },
    updateAddress: (state, action) => {
      const { id, newAddress } = action.payload;
      state.addressList = state.addressList.map((item) =>
        item.id === id ? { ...item, address: newAddress } : item
      );
    },
    updateSelected: (state, action) => {
      const elementIndex = action.payload;

      state.addressList = state.addressList.map((item, index) => {
        const isSelected = index === elementIndex;
        return {
          ...item,
          selected: isSelected,
        };
      });
      // to update addressSelected according to changed selected property
      const selectedAddress = state.addressList.find((item) => item.selected);
      state.addressSelected = selectedAddress
        ? `${selectedAddress.street}, ${selectedAddress.yhouse}`
        : "";
    },
    removeAddress: (state, action) => {
      state.addressList = state.addressList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAddressSelected,
  setAddressList,
  addAddress,
  updateAddress,
  updateSelected,
  removeAddress,
  removeAddressSelected,
  setMapPosition,
} = userSlice.actions;

export default userSlice.reducer;
