import { useCallback, useState } from "react";
import { Button, Input, Select } from "../../UI";
import { Modal } from "../Modal";
import { ModalProps } from "../types";
import "./ModalBoardEdit.css";
import { BoardType, IdBoardType } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { deleteBoard, editBoard, TaskRemoveOnBoard } from "../../../redux";
import { boardColors } from "../../../todoListDefault";

export type ModalBoardEditPayload = {
  newBoard: IdBoardType;
};
type ModalBoardEditProps = ModalProps<ModalBoardEditPayload>;
export const ModalBoardEdit = (props: ModalBoardEditProps) => {
  const { onClose, newBoard } = props;
  const dispatch = useAppDispatch();
  const [modalBoard, setModalBoard] = useState<BoardType>(newBoard.board);
  const selectColor = boardColors.find((bc) => bc.color === newBoard.board.color);
  const [selectValue, setSelectValue] = useState<BoardType | undefined>(
    selectColor,
  );

  const onModalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalBoard.title !== "") {
        onClose();
        dispatch(editBoard({id: newBoard.id, board: modalBoard}));
      } else alert("Заголовок не может быть пустым");
    },
    [modalBoard, onClose, dispatch, newBoard.id],
  );
  const onModalBoardRemove = (id: string) => {
    onClose();
    dispatch(deleteBoard(id));
  };
  const onTitleChange = useCallback(
    (Title: string) =>
      setModalBoard((prev) => {
        return { ...prev, title: Title };
      }),
    [],
  );

  const onColorChange = useCallback((boardColor: BoardType) => {
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
            onClick={() => onModalBoardRemove(newBoard.id)}
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
