import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import { FiX } from "react-icons/fi";

type ModalProps = {
  title: string;
  body: ReactNode;
  footer?: ReactNode;
  closeModal: () => void;
};
const Modal = ({ title, body, footer, closeModal }: ModalProps) => {
  const ref = useRef<HTMLElement | null>(document.querySelector("#modal"));

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
    <Card className="w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4 border-b-2 pb-4">
        <h4 className="font-bold">{title}</h4>
        <Button onClick={closeModal} noPad className="p-1" bgColor="red">
          <FiX />
        </Button>
      </div>
      <div className="pb-4">{body}</div>
      {footer && <div className="border-t-2 py-4">{footer}</div>}
    </Card>,
    document.querySelector("#modal")!
  );
};

export default Modal;
