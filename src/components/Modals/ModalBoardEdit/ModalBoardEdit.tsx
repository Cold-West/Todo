import { ChangeEvent, useCallback, useState } from "react";
import { ButtonPrimary, ButtonSecondary, Input, Select } from "../../UI";
import { Modal } from "../Modal";
import { ModalProps } from "../types";
import "./ModalBoardEdit.css";
import { BoardColorsType, BoardType } from "../../../types";

export type ModalBoardEditPayload = {
  onSubmit: (modalBoard: BoardType) => void;
  onRemove: (id:string)=> void;
  boardColors: BoardColorsType[];
  board: BoardType;
};
type ModalBoardEditProps = ModalProps<ModalBoardEditPayload>;
export const ModalBoardEdit = (props: ModalBoardEditProps) => {
  const { onSubmit, onClose, onRemove, boardColors, board } = props;
  const [modalBoard, setModalBoard] = useState<BoardType>(board);
  const selectColor = boardColors.find((bc) => bc.color === board.color);
  const [selectValue, setSelectValue] = useState<BoardColorsType | undefined>(
    selectColor
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
  const onModalBoardRemove = (id:string) =>{
    onClose();
    onRemove(id);
  }
  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setModalBoard((prev) => {
        return { ...prev, title: e.target.value };
      }),
    []
  );

  const onColorChange = useCallback((boardColor: BoardColorsType) => {
    setSelectValue(boardColor);
    setModalBoard((prev) => {
      return { ...prev, color: boardColor.color };
    });
  }, []);
  return (
    <Modal onClose={onClose}>
      <div className="ModalBorad">
        <div className="ModalBoradBody">
          <Input
            onSubmit={onModalSubmit}
            onChange={onTitleChange}
            value={modalBoard.title}
            className="ModalBoardTitle"
            plaseholder="Title"
          ></Input>
          <div className="ModalBoardSmartListColor">
            <h2 className="ModalBoardH2">Цвет умного листа</h2>
            <Select
              options={boardColors}
              onChangeValue={onColorChange}
              value={selectValue}
            />
          </div>
        </div>
        <div className="ModalBoardEditFooter">
          <ButtonPrimary text="Удалить секцию" onClick={()=>onModalBoardRemove(board.id)}/>
          <div className="ModalButtons">
            <ButtonPrimary text="Сохранить" onClick={onModalSubmit} />
            <ButtonSecondary text="Отмена" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
