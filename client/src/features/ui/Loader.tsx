import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  const ref = useRef<HTMLElement | null>(document.querySelector("#loadPortal"));

  useEffect(() => {
    const current = ref.current;
    if (current) current.classList.add("active");
    return () => {
      if (current) {
        current.classList.remove("active");
      }
    };
  }, []);
  return ReactDOM.createPortal(
    <div className="spinner"></div>,
    document.querySelector("#portal")!
  );
};

export default Loader;
