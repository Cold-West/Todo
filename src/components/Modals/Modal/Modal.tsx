import "./Modal.css";
type ModalProps = {
  children: JSX.Element;
  visible: boolean;
  setVisible: (arg0: boolean) => void;
};
export const Modal = (props: ModalProps) => {
  const { children, visible, setVisible } = props;

  return (
    <div
      className={`Modal ${visible ? "ModalActive" : ""}`}
      onClick={() => setVisible(false)}
    >
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
