import "./TodoAppTask.css";
import { TaskType } from "../../types";
import DatePicker from "react-datepicker";
import { useState } from "react";
type TodoAppTaskProps = {
  task: TaskType;
  remove: () => void;
  onCheckClicked: () => void;
  onDragOver: (e) => void;
  onDragLeave: (e) => void;
  onDragStart: (e) => void;
  onDragEnd: (e) => void;
  onDrop: (e) => void;
};

export const TodoAppTask = (props: TodoAppTaskProps) => {
  const {
    task,
    remove,
    onCheckClicked,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDragStart,
    onDrop,
  } = props;
  const [startDate, setStartDate] = useState<Date | null>(task.date);
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      draggable={true}
      className="TodoAppBox"
    >
      <div>
        <input
          type="checkbox"
          className="TodoAppBoxCheck"
          checked={task.check}
          onChange={onCheckClicked}
        />
      </div>
      <span>
        <h2>{task.title}</h2>
        <p>{task.text}</p>
      </span>
      <div className="rightSide">
        <button className="TodoAppBoxDelete" onClick={remove}>
          ×
        </button>
        <DatePicker
          closeOnScroll={(e) => e.target === document}
          className="datePickerInput"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </div>
  );
};
