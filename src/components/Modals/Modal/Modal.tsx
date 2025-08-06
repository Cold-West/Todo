import "./Modal.css";
type ModalProps = {
  children: JSX.Element;
  setVisible: (arg0: boolean) => void;
  visible: boolean
};
export const Modal = (props: ModalProps) => {
  const { children, setVisible, visible} = props;

  if (visible) return (
    <div className={"Modal"} onClick={() => setVisible(false)}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
