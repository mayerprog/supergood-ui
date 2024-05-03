// getItems

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
