import "./Modal.css";
type ModalProps = {
  children: JSX.Element;
  setVisible: (arg0: boolean) => void;
};
export const Modal = (props: ModalProps) => {
  const { children, setVisible} = props;

  return (
    <div className={"Modal"} onClick={() => setVisible(false)}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
