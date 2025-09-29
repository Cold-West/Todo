import { useCallback, useState } from "react";
import "./ModalTaskCreate.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { BoardType, TaskType } from "../../../types";
import { Modal } from "../Modal";
import { Button, CheckBox, Input, Select } from "../../UI";
import { ModalProps } from "../types";
import { INITIAL_MODALTASK_STATE } from "../../../todoListDefault";
import { useAppDispatch } from "../../../app/hooks";
import { TaskCreate } from "../../../redux/taskList/taskListSlice";

export type ModalTaskCreatePayload = {
  boards: BoardType[];
  currentBoard: string;
};

type ModalTaskCreateProps = ModalProps<ModalTaskCreatePayload>;

export const ModalTaskCreate = (props: ModalTaskCreateProps) => {
  const { onClose, boards, currentBoard } = props;
  const [modalTask, setModalTask] = useState<TaskType>({
    ...INITIAL_MODALTASK_STATE,
    boardID: currentBoard,
  });
  const selectBoard = boards.find((board) => board.id === modalTask.boardID);
  const [selectValue, setSelectValue] = useState<BoardType | undefined>(
    selectBoard,
  );
  const dispatch = useAppDispatch();

  const onChangeTitle = useCallback(
    (Title: string) =>
      setModalTask((prev) => {
        return { ...prev, title: Title };
      }),
    [],
  );

  const onChangeText = useCallback(
    (Text: string) =>
      setModalTask((prev) => {
        return { ...prev, text: Text };
      }),
    [],
  );

  const onChangeDate = useCallback(
    (Date: Date | null) =>
      setModalTask((prev) => {
        return { ...prev, date: Date };
      }),
    [],
  );

  const onChangeCheck = useCallback(
    () =>
      setModalTask((prev) => {
        return { ...prev, check: !modalTask.check };
      }),
    [modalTask.check],
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
        dispatch(TaskCreate(modalTask));
      } else alert("Заголовок не может быть пустым");
    },
    [onClose, modalTask, dispatch],
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
