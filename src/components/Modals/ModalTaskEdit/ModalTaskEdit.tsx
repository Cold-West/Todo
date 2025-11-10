import { useCallback, useState } from "react";
import "./ModalTaskEdit.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { IdTaskType, TaskType } from "../../../types";
import { Modal } from "../Modal";
import { Button, CheckBox, Input, Select } from "../../UI";
import { ModalProps } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { editTask } from "../../../redux";

export type ModalTaskEditPayload = {
  newTask: IdTaskType;
};
type ModalTaskEditProps = ModalProps<ModalTaskEditPayload>;
interface boardForSelectType {
  color: string;
  title: string;
  id: string;
}

export const ModalTaskEdit = (props: ModalTaskEditProps) => {
  const { onClose, newTask } = props;
  const boards = useAppSelector((state) => state.Boards.boards);

  const boardForSelect: boardForSelectType[] = boards.map((boards) => {
    return {
      ...boards.board,
      id: boards.id,
    };
  });

  const [modalTask, setModalTask] = useState<TaskType>(newTask.task);

  const selectBoard = boardForSelect.find(
    (board) => board.id === newTask.task.boardID
  );

  const [selectValue, setSelectValue] = useState<boardForSelectType | undefined>(selectBoard);

  const dispatch = useAppDispatch();

  const onChangeTitle = useCallback(
    (Title: string) =>
      setModalTask((prev) => {
        return { ...prev, title: Title };
      }),
    []
  );

  const onChangeText = useCallback(
    (Text: string) =>
      setModalTask((prev) => {
        return { ...prev, text: Text };
      }),
    []
  );

   const onChangeDate = useCallback(
    (Date: Date | null) =>
      setModalTask((prev) => {
        return { ...prev, date: Date ? Date.toString() : null};
      }),
    []
  );

  const onChangeCheck = useCallback(
    () =>
      setModalTask((prev) => {
        return { ...prev, check: !modalTask.check };
      }),
    [modalTask.check]
  );

  const onChangeBoardId = useCallback((board: boardForSelectType) => {
    setSelectValue(board);
    setModalTask((prev) => {
      return { ...prev, boardID: board.id };
    });
  }, []);

  const onModalSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalTask.title !== "") {
        onClose();
        dispatch(editTask({id: newTask.id, task: modalTask}));
      } else alert("Заголовок не может быть пустым");
    },
    [dispatch, modalTask, onClose, newTask.id]
  );
  return (
    <Modal onClose={onClose}>
      <div className="ModalTask">
        <div className="ModalTaskBody">
          <Input
            onSubmit={onModalSubmit}
            value={modalTask.title}
            onChange={onChangeTitle}
            plaseholder="Title"
            className="ModalTaskTitle"
            variant="input"
          />
          <div className="ModalTaskTextDiv">
            <h2 className="ModalTaskH2">Описание</h2>
            <Input
              onSubmit={onModalSubmit}
              value={modalTask.text}
              onChange={onChangeText}
              className="ModalTaskText"
              variant="textarea"
            />
          </div>
          <div className="ModalTaskAdditional">
            <div className="ModalTaskSection">
              <p>Секция задач</p>
              <Select
                options={boardForSelect}
                onChangeValue={onChangeBoardId}
                value={selectValue}
              />
            </div>
            <div className="ModalTaskSection">
              <p>Дата выполнения</p>
              <div className="ModalTaskDate">
                <FontAwesomeIcon icon={faClock} className="ModalTaskDateIcon" />
                <DatePicker
                  className="ModalTaskDatePicker"
                  selected={newTask.task.date ? new Date(newTask.task.date) : null}
                  onChange={onChangeDate}
                  dateFormat="MMMM d"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ModalTaskFooter">
          <div className="ModalTaskCheck">
            <CheckBox check={modalTask.check} onClick={onChangeCheck} />
            Дело сделано
          </div>
          <div className="ModalTaskButtons">
            <Button
              onClick={onModalSubmit}
              text="Сохранить"
              variant="primary"
            />
            <Button onClick={onClose} text="Отмена" variant="secondary" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
