// get items from API
useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const itemsArray = [];
      const allItems = await itemAPI.getItems(1257);

      Object.keys(allItems.items).forEach((categoryId) => {
        const categoryObject = allItems.items[categoryId];
        const category = Object.values(categoryObject);
        // console.log("category", category);
        category.forEach((itemGroup) => {
          Object.values(itemGroup).forEach((item) => {
            const itemForPush = Object.values(item);
            // console.log("item", itemForPush);
            itemsArray.push(itemForPush[0]);
          });
        });
      });
      dispatch(setItems(itemsArray));
      if (itemsArray.length === 0) setLoading(true);
      else setLoading(false);
    } catch (err) {
      console.log(err);
    }
  })();
}, [dispatch]);

// get items from json
// useEffect(() => {
//   const itemsArray = [];
//   Object.keys(jsonData.items).forEach((categoryId) => {
//     const categoryObject = jsonData.items[categoryId];
//     const category = Object.values(categoryObject);
//     // console.log("category", category);
//     category.forEach((itemGroup) => {
//       Object.values(itemGroup).forEach((item) => {
//         const itemForPush = Object.values(item);
//         itemsArray.push(itemForPush[0]);
//       });
//     });
//   });
//   console.log("itemsArray", itemsArray);
//   dispatch(setItems(itemsArray));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [dispatch]);

// get poly points
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
