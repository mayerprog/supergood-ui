import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressSelected: {},
  mapPosition: [55.7558, 37.6173],
  addressList: [],
  floor: "",
  flat: "",
  entrance: "",
  description: "",
  userData: {},
  salesid: null,
  token: null,
  deptId: "",
  minorAreaId: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSalesid: (state, action) => {
      state.salesid = action.payload;
    },
    setDeptId: (state, action) => {
      state.deptId = action.payload;
    },
    setMinorAreaId: (state, action) => {
      state.minorAreaId = action.payload;
    },
    setFloor: (state, action) => {
      state.floor = action.payload;
    },
    setFlat: (state, action) => {
      state.flat = action.payload;
    },
    setEntrance: (state, action) => {
      state.entrance = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMapPosition: (state, action) => {
      state.mapPosition = action.payload;
    },
    setAddressSelected: (state, action) => {
      state.addressSelected = action.payload;
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
    updateSelected: (state, action) => {
      const elementIndex = action.payload;

      state.addressList = state.addressList.map((item, index) => {
        const isSelected = index === elementIndex;
        return {
          ...item,
          selected: isSelected,
        };
      });
    },
  },
});

export const {
  setPhone,
  setAddressSelected,
  setAddressList,
  setUserData,
  setSalesid,
  setDeptId,
  setMinorAreaId,
  setToken,
  setFloor,
  setFlat,
  setEntrance,
  setDescription,
  addAddress,
  updateSelected,
  setMapPosition,
} = userSlice.actions;

export default userSlice.reducer;
