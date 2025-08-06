import "./TodoAppTask.css";
import { TaskType } from "../../types";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "../UI";
type TodoAppTaskProps = {
  task: TaskType;
  remove: () => void;
  onCheckClicked: () => void;
  onEdit: () => void;
};

export const TodoAppTask = (props: TodoAppTaskProps) => {
  const { task, remove, onCheckClicked, onEdit } = props;
  const [startDate, setStartDate] = useState<Date | null>(task.date);


  return (
    <div className="TodoAppBox">
      <div className="TodoAppBoxTop">
        <div className="inputDiv">
          <CheckBox check={task.check} onClick={onCheckClicked}/>
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
          <button className="TodoAppBoxDelete" onClick={onEdit}>
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
