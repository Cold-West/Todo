import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ModalTaskCreate, ModalTaskCreatePayload } from "./ModalTaskCreate";
import { ModalTaskEdit, ModalTaskEditPayload } from "./ModalTaskEdit";
import { ModalBoardCreate, ModalBoardCreatePayload } from "./ModalBoardCreate";
import {
  ModalBoardEdit,
  ModalBoardEditPayload,
} from "./ModalBoardEdit/ModalBoardEdit";

const ModalContext = createContext<ModalContextType>({} as never);

type ModalState =
  | {
      type: "ModalTaskCreate";
      payload: ModalTaskCreatePayload;
    }
  | {
      type: "ModalTaskEdit";
      payload: ModalTaskEditPayload;
    }
  | {
      type: "ModalBoardCreate";
      payload: ModalBoardCreatePayload;
    }
  | {
      type: "ModalBoardEdit";
      payload: ModalBoardEditPayload;
    };

type ModalContextType = {
  openModal: (arg: ModalState) => void;
};

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<null | ModalState>(null);

  const commonProps = useMemo(() => {
    return {
      onClose: () => setModalState(null),
    };
  }, []);

  const openModal = useCallback((args: ModalState) => {
    setModalState(args);
  }, []);

  return (
    <ModalContext value={{ openModal }}>
      {modalState?.type === "ModalTaskCreate" && (
        <ModalTaskCreate {...modalState.payload} {...commonProps} />
      )}
      {modalState?.type === "ModalTaskEdit" && (
        <ModalTaskEdit {...modalState.payload} {...commonProps} />
      )}
      {modalState?.type === "ModalBoardCreate" && (
        <ModalBoardCreate {...modalState.payload} {...commonProps} />
      )}
      {modalState?.type === "ModalBoardEdit" && (
        <ModalBoardEdit {...modalState.payload} {...commonProps} />
      )}
      {children}
    </ModalContext>
  );
};
