import { useCallback, useState } from "react";
import "./ModalTaskCreate.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { TaskType } from "../../../types";
import { Modal } from "../Modal";
import { Button, CheckBox, Input, Select } from "../../UI";
import { INITIAL_MODALTASK_STATE } from "../../../todoListDefault";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTask } from "../../../redux/taskList/taskListSlice";
import { Timestamp } from "firebase/firestore";

type ModalTaskCreateProps = {
  onClose: () => void;
};
interface boardForSelectType{
  color: string;
  title: string;
  id: string;
}

export const ModalTaskCreate = (props: ModalTaskCreateProps) => {
  const { onClose } = props;
  const boards = useAppSelector((state) => state.Boards.boards);
  const boardForSelect:boardForSelectType[] = boards.map((boards) => {
    return {
      ...boards.board,
      id: boards.id,
    };
  });
  const currentBoard = useAppSelector((state) => state.Boards.currentBoard);
  const [modalTask, setModalTask] = useState<TaskType>({
    ...INITIAL_MODALTASK_STATE,
    boardID: currentBoard,
  });
  

  const selectBoard = boardForSelect.find((board) => board.id === modalTask.boardID);
  const [selectValue, setSelectValue] = useState<boardForSelectType | undefined>(
    selectBoard
  );

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
        console.log()
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
        dispatch(addTask(modalTask));
      } else alert("Заголовок не может быть пустым");
    },
    [onClose, modalTask, dispatch]
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
