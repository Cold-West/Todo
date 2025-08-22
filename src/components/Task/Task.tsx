import "./Task.css";
import { TaskType } from "../../types";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "../UI";
type TaskProps = {
  task: TaskType;
  onRemove: () => void;
  onCheckClicked: () => void;
  onEdit: () => void;
};

export const Task = (props: TaskProps) => {
  const { task, onRemove, onCheckClicked, onEdit } = props;
  const [startDate, setStartDate] = useState<Date | null>(task.date);


  return (
    <div className="TaskBox">
      <div className="TaskTop">
        <div className="TaskCheck">
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
        <div className="TaskRightSide">
          <button className="TaskButton" onClick={onEdit}>
            Редактировать
          </button>
          <button className="TaskButton" onClick={onRemove}>
            Удалить
          </button>
        </div>
      </div>
      <div className="TaskText">{task.text}</div>
    </div>
  );
};
