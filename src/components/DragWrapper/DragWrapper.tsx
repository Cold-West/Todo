import { JSX, useCallback, useRef } from "react";
import { TaskType } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { DNDdropHandler } from "../../redux/";

type DragWrapper = {
  taskData: TaskType[];
  renderTasks: (data: TaskType) => JSX.Element;
};
export const DragWrapper = (props: DragWrapper) => {
  const { taskData, renderTasks } = props;
  const dispatch = useAppDispatch();

  const startTask = useRef<false | TaskType>(false);

  const dragStartHandler = useCallback(
    (_e: React.DragEvent<HTMLDivElement>, task: TaskType) => {
      startTask.current = task;
    },
    [],
  );

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className == "TodoAppBox") {
      target.style.boxShadow = "0 4px 3px gray";
    }
  }, []);

  const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, dropTask: TaskType) => {
      e.stopPropagation();
      const target = e.target as HTMLDivElement;
      target.style.boxShadow = "none";

      const startTaskValue = startTask.current;

      if (startTaskValue === false) {
        return;
      }
      dispatch(DNDdropHandler(startTaskValue, dropTask));

      startTask.current = false;
    },
    [dispatch],
  );

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
