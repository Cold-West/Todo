import { useRef } from "react";
import { BoardType, TaskType } from "../../types";

type DragWrapper = {
  taskData: TaskType[];
  renderTasks: (data: TaskType) => JSX.Element;
  boardData: BoardType[];
  renderBoards: (data: BoardType, children: JSX.Element) => JSX.Element;
  onDrop: (startTaskValue: TaskType, dropItem: TaskType) => void;
  onDropBoard: (startItem: TaskType | BoardType, dropItem: BoardType) => void;
};
export const DragWrapper = (props: DragWrapper) => {
  const {
    taskData,
    renderTasks,
    boardData,
    renderBoards,
    onDrop,
    onDropBoard,
  } = props;

  const startTask = useRef<false | TaskType>(false);
  const startBoard = useRef<false | BoardType>(false);

  const dragStartHandler = (
    _e: React.DragEvent<HTMLDivElement>,
    task: TaskType,
    board: BoardType
  ) => {
    startTask.current = task;
    startBoard.current = board;
  };

  const dragBoardStartHandler = (
    _e: React.DragEvent<HTMLDivElement>,
    board: BoardType
  ) => {
    startBoard.current = board;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className == "TodoAppBox") {
      target.style.boxShadow = "0 4px 3px gray";
    }
    if (target.className == "board") {
      target.style.boxShadow = "0 5px 5px gray";
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
    dropTask: TaskType
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
    startBoard.current = false;
  };

  const dropOnBoardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: BoardType
  ) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
    if (startBoard.current === false) {
      return;
    }
    if (startTask.current === false) {
      const startItem = startBoard.current;
      onDropBoard(startItem, board);
      startTask.current = false;
      startBoard.current = false;
    } else {
      const startItem = startTask.current;
      onDropBoard(startItem, board);
      startTask.current = false;
      startBoard.current = false;
    }
  };

  return (
    <>
      {boardData.map((board) => {
        return (
          <div
            key={board.id}
            draggable={true}
            onDragStart={(e) => dragBoardStartHandler(e, board)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropOnBoardHandler(e, board)}
          >
            {renderBoards(
              board,
              taskData
                .filter((task) => task.boardID === board.id)
                .map((task) => {
                  return (
                    <div
                      draggable={true}
                      onDragStart={(e) => dragStartHandler(e, task, board)}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, task)}
                    >
                      {renderTasks(task)}
                    </div>
                  );
                })
            )}
          </div>
        );
      })}
    </>
  );
};
