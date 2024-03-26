import { useEffect, useRef, useState } from "react";

export const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  const onLoad = () => {
    if (
      ref.current &&
      ref.current.complete &&
      ref.current.naturalHeight !== 0
    ) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  // useEffect(() => {
  //   const image = ref.current;
  //   if (image.complete && image.naturalHeight !== 0) {
  //     onLoad();
  //   } else {
  //     image.addEventListener("load", onLoad);
  //     image.addEventListener("error", onLoad);
  //   }

  //   return () => {
  //     if (image) {
  //       image.removeEventListener("load", onLoad);
  //       image.removeEventListener("error", onLoad);
  //     }
  //   };
  // }, [ref.current]);

  return [ref, loaded, onLoad];
};
