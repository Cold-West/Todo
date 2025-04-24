import "./TodoAppTask.css";
import { TaskType } from "../../types";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
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
      <input
        type="checkbox"
        className="TodoAppBoxCheck"
        checked={task.check}
        onChange={onCheckClicked}
      />
      <span>{task.text}</span>
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
