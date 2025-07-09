import { useCallback, useState } from "react";
import "./ModalTask.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { BoardType, ModalTaskType } from "../../../types";
import { INITIAL_MODALTASK_STATE } from "../../../todoListDefault";
import { Select } from "../../Select";
type ModalTaskProps = {
  create: (modalTask: ModalTaskType) => void;
  setVisible: (arg0: boolean) => void;
  boards: BoardType[];
};
export const ModalTask = (props: ModalTaskProps) => {
  const { create, setVisible, boards } = props;

  const [modalTask, setModalTask] = useState<ModalTaskType>(
    INITIAL_MODALTASK_STATE
  );

  const onChangeTitle = useCallback(
    (e) =>
      setModalTask((prev) => {
        return { ...prev, title: e.target.value };
      }),
    []
  );

  const onChangeText = useCallback(
    (e) =>
      setModalTask((prev) => {
        return { ...prev, text: e.target.value };
      }),
    []
  );

  const onChangeDate = useCallback(
    (Date) =>
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

  const onChangeId = useCallback(
    (id) =>
      setModalTask((prev) => {
        return { ...prev, boardID: id };
      }),
    []
  );

  const onCancel = useCallback(() => {
    setVisible(false);
    setModalTask(INITIAL_MODALTASK_STATE);
  }, [setVisible]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalTask.title !== "") {
        create(modalTask);
        setModalTask(INITIAL_MODALTASK_STATE);
        setVisible(false);
      } else alert("Заголовок не может быть пустым");
    },
    [create, setVisible, modalTask]
  );

  return (
    <div className="ModalTask">
      <div className="ModalTaskBody">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={modalTask.title}
            onChange={onChangeTitle}
            className="ModalTaskInput ModalTaskTitle"
          />
        </form>
        <div>
          <h2 className="ModalTaskH2">Описание</h2>
          <form onSubmit={onSubmit}>
            <textarea
              placeholder="text"
              value={modalTask.text}
              onChange={onChangeText}
              className="ModalTaskInput ModalTaskText"
            />
          </form>
        </div>
        <div className="ModalTaskAdditional">
          <div className="ModalTaskSection">
            <p style={{ paddingLeft: "12px" }}>Секция задач</p>
            <Select selectable={boards} onChangeId={onChangeId}/>
          </div>
          <div className="ModalTaskSection">
            <p style={{ paddingLeft: "12px" }}>Дата выполнения</p>
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
          <input
            type="checkbox"
            className="ModalTaskCheckBox"
            checked={modalTask.check}
            onChange={onChangeCheck}
          />
          Дело сделано
        </div>
        <div className="ModalTaskButtons">
          <button className="ModalTaskSave" onClick={onSubmit}>
            Сохранить
          </button>
          <button className="ModalTaskCansel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
