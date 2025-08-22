import { ChangeEvent, useCallback, useState } from "react";
import { ButtonPrimary, ButtonSecondary, Input, Select } from "../../UI";
import { Modal } from "../Modal";
import { ModalProps } from "../types";
import "./ModalBoardCreate.css";
import { BoardColorsType, BoardType } from "../../../types";
import { INITIAL_MODALBOARD_STATE } from "../../../todoListDefault";

export type ModalBoardCreatePayload = {
  onSubmit: (modalBoard: BoardType) => void;
  boardColors: BoardColorsType[];
};
type ModalBoardCreateProps = ModalProps<ModalBoardCreatePayload>;
export const ModalBoardCreate = (props: ModalBoardCreateProps) => {
  const { onSubmit, onClose, boardColors } = props;
  const [modalBoard, setModalBoard] = useState<BoardType>(
    INITIAL_MODALBOARD_STATE
  );
  const [selectValue, setSelectValue] = useState<BoardColorsType | undefined>(
    
  );

  const onModalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalBoard.title !== "") {
        onClose();
        onSubmit(modalBoard);
      } else alert("Заголовок не может быть пустым");
    },
    [modalBoard, onSubmit, onClose]
  );
  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setModalBoard((prev) => {
        return { ...prev, title: e.target.value };
      }),
    []
  );

  const onColorChange = useCallback((boardColor:BoardColorsType)=>{
    setSelectValue(boardColor);
    setModalBoard((prev)=>{
      return {...prev, color: boardColor.color}
    })
  },[])
  return (
    <Modal onClose={onClose}>
      <div className="ModalBorad">
        <div className="ModalBoradBody">
          <Input
            onSubmit={onModalSubmit}
            onChange={onTitleChange}
            value={modalBoard?.title}
            className="ModalBoardTitle"
            plaseholder="Title"
          ></Input>
          <div className="ModalBoardSmartListColor">
            <h2 className="ModalBoardH2">Цвет умного листа</h2>
            <Select options={boardColors} onChangeValue={onColorChange} value={selectValue}></Select>
          </div>
        </div>
        <div className="ModalBoardFooter">
          <div className="ModalButtons">
            <ButtonPrimary text="Сохранить" onClick={onModalSubmit} />
            <ButtonSecondary text="Отмена" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
