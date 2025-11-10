import { JSX, useCallback, useRef } from "react";
import { IdTaskType } from "../../types";
import { useAppDispatch } from "../../app/hooks";

type DragWrapper = {
  taskData: IdTaskType[];
  renderTasks: (data: IdTaskType) => JSX.Element;
};
export const DragWrapper = (props: DragWrapper) => {
  const { taskData, renderTasks } = props;
  const dispatch = useAppDispatch();

  const startTask = useRef<false | IdTaskType>(false);

  const dragStartHandler = useCallback(
    (_e: React.DragEvent<HTMLDivElement>, task: IdTaskType) => {
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
    (e: React.DragEvent<HTMLDivElement>, dropTask: IdTaskType) => {
      e.stopPropagation();
      const target = e.target as HTMLDivElement;
      target.style.boxShadow = "none";

      const startTaskValue = startTask.current;

      if (startTaskValue === false) {
        return;
      }
      
      startTask.current = false;
    },
    [],
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
