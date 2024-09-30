import { useEffect } from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  const ref = document.querySelector("#portal");
  useEffect(() => {
    ref?.classList.add("active");

    return () => {
      ref?.classList.remove("active");
    };
  }, []);
  return ReactDOM.createPortal(
    <div className="spinner"></div>,
    document.querySelector("#portal")!
  );
};

export default Loader;
