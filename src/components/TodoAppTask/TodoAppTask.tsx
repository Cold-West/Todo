import "./TodoAppTask.css";
import { TaskType } from "../../types";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
type TodoAppTaskProps = {
  task: TaskType;
  remove: () => void;
  onCheckClicked: () => void;
};

export const TodoAppTask = (props: TodoAppTaskProps) => {
  const { task, remove, onCheckClicked } = props;
  const [startDate, setStartDate] = useState<Date | null>(task.date);
  return (
    <div className="TodoAppBox">
      <div className="TodoAppBoxTop">
        <div className="inputDiv">
          <input
            type="checkbox"
            className="TodoAppBoxCheck"
            checked={task.check}
            onChange={onCheckClicked}
          />
        </div>
        <div>
          <h2 className="TaskTitle">{task.title}</h2>
          <FontAwesomeIcon icon={faClock} className="TaskDateIcon" />
          <DatePicker
            className="datePickerInput"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d"
          />
        </div>
        <div className="rightSide">
          <button className="TodoAppBoxDelete" onClick={remove}>
            Редактировать
          </button>
          <button className="TodoAppBoxDelete" onClick={remove}>
            Удалить
          </button>
        </div>
      </div>
      <div className="TaskText">{task.text}</div>
    </div>
  );
};
