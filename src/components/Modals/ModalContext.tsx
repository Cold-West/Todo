import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ModalEditTask, ModalTask, ModalTaskEditPayload, ModalTaskPayload } from "..";

const ModalContext = createContext<ModalContextType>({} as never)

type ModalState = {
	type: 'ModalTask',
	payload: ModalTaskPayload
} | {
	type: 'ModalTaskEdit',
	payload: ModalTaskEditPayload
}

type ModalContextType = {
	openModal: (arg: ModalState) => void;
}

export const useModalContext = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
	const [modalState, setModalState] = useState<null | ModalState>(null)

	const commonProps = useMemo(() => {
		return {
			onClose: () => setModalState(null),
		}	
	}, [])

	const openModal = useCallback((args: ModalState) => {
		setModalState(args);
	}, []);

	return (
		<ModalContext.Provider value={{ openModal }}>
			{modalState?.type === 'ModalTask' && (
				<ModalTask
					{...modalState.payload}
					{...commonProps}
				/>
			)}
			{modalState?.type === 'ModalTaskEdit' && (
				<ModalEditTask
					{...modalState.payload}
					{...commonProps}
				/>
			)}
			{children}
		</ModalContext.Provider>
	)
}