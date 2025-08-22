import { ChangeEvent, useCallback, useState } from "react";
import "./ModalTaskEdit.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { BoardType, TaskType } from "../../../types";
import { Modal } from "../Modal";
import {
  ButtonPrimary,
  ButtonSecondary,
  CheckBox,
  Input,
  Select,
  Textarea,
} from "../../UI";
import { ModalProps } from "../types";

export type ModalTaskEditPayload = {
  boards: BoardType[];
  task: TaskType;
  onSubmit: (data: TaskType) => void;
};
type ModalTaskEditProps = ModalProps<ModalTaskEditPayload>;

export const ModalTaskEdit = (props: ModalTaskEditProps) => {
  const { onSubmit, onClose, boards, task } = props;

  const [modalTask, setModalTask] = useState<TaskType>(task);
  const selectBoard = boards.find((board) => board.id === task.boardID);
  const [selectValue, setSelectValue] = useState<BoardType | undefined>(
    selectBoard
  );

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setModalTask((prev) => {
        return { ...prev, title: e.target.value };
      }),
    []
  );

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setModalTask((prev) => {
        return { ...prev, text: e.target.value };
      }),
    []
  );

  const onChangeDate = useCallback(
    (Date: Date | null) =>
      setModalTask((prev) => {
        return { ...prev, date: Date };
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

  const onChangeBoardId = useCallback((board: BoardType) => {
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
        onSubmit(modalTask);
      } else alert("Заголовок не может быть пустым");
    },
    [onSubmit, modalTask, onClose]
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
          />
          <div className="ModalTaskTextDiv">
            <h2 className="ModalTaskH2">Описание</h2>
            <Textarea
              onSubmit={onModalSubmit}
              value={modalTask.text}
              onChange={onChangeText}
              className="ModalTaskText"
            />
          </div>
          <div className="ModalTaskAdditional">
            <div className="ModalTaskSection">
              <p>Секция задач</p>
              <Select
                options={boards}
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
                  selected={modalTask.date}
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
            <ButtonPrimary
              onClick={onModalSubmit}
              text="Сохранить"
            ></ButtonPrimary>
            <ButtonSecondary onClick={onClose} text="Отмена" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
