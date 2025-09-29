import { useCallback, useState } from "react";
import { Button, Input, Select } from "../../UI";
import { Modal } from "../Modal";
import { ModalProps } from "../types";
import "./ModalBoardEdit.css";
import { BoardColorsType, BoardType } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { BoardEdit, BoardRemove, TaskRemoveOnBoard } from "../../../redux";

export type ModalBoardEditPayload = {
  boardColors: BoardColorsType[];
  board: BoardType;
};
type ModalBoardEditProps = ModalProps<ModalBoardEditPayload>;
export const ModalBoardEdit = (props: ModalBoardEditProps) => {
  const { onClose, boardColors, board } = props;
  const dispatch = useAppDispatch();
  const [modalBoard, setModalBoard] = useState<BoardType>(board);
  const selectColor = boardColors.find((bc) => bc.color === board.color);
  const [selectValue, setSelectValue] = useState<BoardColorsType | undefined>(
    selectColor,
  );

  const onModalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalBoard.title !== "") {
        onClose();
        dispatch(BoardEdit(modalBoard));
      } else alert("Заголовок не может быть пустым");
    },
    [modalBoard, dispatch, onClose],
  );
  const onModalBoardRemove = (id: string) => {
    onClose();
    dispatch(TaskRemoveOnBoard(id));
    dispatch(BoardRemove(id));
  };
  const onTitleChange = useCallback(
    (Title: string) =>
      setModalBoard((prev) => {
        return { ...prev, title: Title };
      }),
    [],
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
            variant="input"
          />
          <div className="ModalBoardSmartListColor">
            <h2 className="ModalBoardH2">Цвет умного листа</h2>
            <Select
              options={boardColors}
              onChangeValue={onColorChange}
              value={selectValue}
            ></Select>
          </div>
        </div>
        <div className="ModalBoardEditFooter">
          <Button
            text="Удалить секцию"
            onClick={() => onModalBoardRemove(board.id)}
            variant="primary"
          />
          <div className="ModalButtons">
            <Button
              text="Сохранить"
              onClick={onModalSubmit}
              variant="primary"
            />
            <Button text="Отмена" onClick={onClose} variant="secondary" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
