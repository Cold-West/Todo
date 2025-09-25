import { JSX } from "react";
import "./Modal.css";
type ModalProps = {
  children: JSX.Element;
  onClose:()=>void;
};
export const Modal = (props: ModalProps) => {
  const { children, onClose} = props;
  
 return (
    <div className={"Modal"} onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
