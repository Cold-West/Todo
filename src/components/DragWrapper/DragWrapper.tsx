import { useRef } from "react";
import { TaskType } from "../../types";

type DragWrapper = {
  taskData: TaskType[];
  renderTasks: (data: TaskType) => JSX.Element;
  onDrop: (startTaskValue: TaskType, dropItem: TaskType) => void;
};
export const DragWrapper = (props: DragWrapper) => {
  const { taskData, renderTasks, onDrop } = props;

  const startTask = useRef<false | TaskType>(false);

  const dragStartHandler = (
    _e: React.DragEvent<HTMLDivElement>,
    task: TaskType,
  ) => {
    startTask.current = task;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className == "TodoAppBox") {
      target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    dropTask: TaskType,
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";

    const startTaskValue = startTask.current;

    if (startTaskValue === false) {
      return;
    }
    onDrop(startTaskValue, dropTask);

    startTask.current = false;
  };

  return (
    <>
      {taskData.map((task) => {
        return (
          <div
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, task)}
          >
            {renderTasks(task)}
          </div>
        );
      })}
    </>
  );
};
