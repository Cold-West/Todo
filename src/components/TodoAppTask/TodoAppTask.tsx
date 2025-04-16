import "./TodoAppTask.css";
import { TaskType } from "../../types";
type TodoAppTaskProps = {
  task: TaskType
  remove: () => void;
  onCheckClicked: () => void;
};

export const TodoAppTask = (props: TodoAppTaskProps) => {
  const { task, remove, onCheckClicked } = props;
  return (
    <div className="TodoAppBox">
      <input
        type="checkbox"
        className="TodoAppBoxCheck"
        checked={task.check}
        onChange={onCheckClicked}
      />
      <span>{task.text}</span>
      <button className="TodoAppBoxDelete" onClick={remove}>
        ×
      </button>
    </div>
  );
};
