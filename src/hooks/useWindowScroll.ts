import { useState, useEffect } from "react";

const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState(0);

  const getScroll = () => {
    setWindowScroll(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getScroll();
      window.addEventListener("scroll", getScroll);

      return () => {
        window.removeEventListener("scroll", getScroll);
      };
    }
  }, []);

  return windowScroll;
};

export default useWindowScroll;
