import { useCallback, useState } from "react";
import { Button, Input, Select } from "../../UI";
import { Modal } from "../Modal";
import "./ModalBoardCreate.css";
import {  BoardType } from "../../../types";
import { boardColors, INITIAL_MODALBOARD_STATE } from "../../../todoListDefault";
import { useAppDispatch } from "../../../app/hooks";
import { addBoard } from "../../../redux";

type ModalBoardCreateProps = {
  onClose: ()=> void;
};
export const ModalBoardCreate = (props: ModalBoardCreateProps) => {
  const { onClose } = props;
  const dispatch = useAppDispatch();
  const [modalBoard, setModalBoard] = useState<BoardType>(
    INITIAL_MODALBOARD_STATE,
  );
  const [selectValue, setSelectValue] = useState<BoardType | undefined>();

  const onModalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalBoard.title !== "") {
        onClose();
        dispatch(addBoard(modalBoard))
      } else alert("Заголовок не может быть пустым");
    },
    [modalBoard, dispatch, onClose],
  );
  const onTitleChange = useCallback(
    (Text: string) =>
      setModalBoard((prev) => {
        return { ...prev, title: Text };
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
            value={modalBoard?.title}
            className="ModalBoardTitle"
            plaseholder="Title"
            variant="input"
          ></Input>
          <div className="ModalBoardSmartListColor">
            <h2 className="ModalBoardH2">Цвет умного листа</h2>
            <Select
              options={boardColors}
              onChangeValue={onColorChange}
              value={selectValue}
            ></Select>
          </div>
        </div>
        <div className="ModalBoardFooter">
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
