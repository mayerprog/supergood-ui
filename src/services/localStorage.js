// convert object to string and store in localStorage
export const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    console.log("serialisedState", serialisedState);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    console.log("getSerialisedState", JSON.parse(serialisedState));

    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
