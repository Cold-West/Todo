import { useMemo, useState, useCallback } from "react";
import { TodoAppTask, TodoAppHeader, TodoAppFooter } from "./components";
import { BOARDS_INIT, TASKS_INIT } from "./constants";
import { BoardType, FilterType, SorterType, TaskMap, TaskType } from "./types";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

export function App() {
  /*
    Data source
  */
  const [tasksMap, setTasksMap] = useState<TaskMap>(TASKS_INIT);
  const [boards, setBoards] = useState<BoardType[]>(BOARDS_INIT);
  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);
  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  /*
    Transitive data
  */
  const todoActiveCounter = useMemo(() => {
    return Object.values(tasksMap).filter((t) => t.check !== true).length;
  }, [tasksMap]);

  // const filteredTasks = useMemo(() => {
  //   if (filters === FilterType.ACTIVE) {
  //     return todoTasks.filter((t) => t.check !== true);
  //   }
  //   if (filters === FilterType.COMPLETED) {
  //     return todoTasks.filter((t) => t.check == true);
  //   }
  //   return todoTasks;
  // }, [filters, todoTasks]);

  // const visibleTasks = useMemo(() => {
  //   if (sorters === SorterType.aTOb) {
  //     return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
  //   }
  //   if (sorters === SorterType.bTOa) {
  //     return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
  //   }
  //   return filteredTasks;
  // }, [filteredTasks, sorters]);

  /*
    Actions
  */

  const addBoard = () => {
    setBoards((prev) => {
      return [...prev, { id: String(Date.now()), title: "test", taskIds: [] }];
    });
  };

  const createNewTodo = useCallback(
    (title: string, text: string, date: Date | null) => {
      const taskId = String(Date.now());

      setTasksMap((prev) => {
        const task: TaskType = {
          title,
          text,
          id: taskId,
          check: false,
          date,
        };

        return { ...prev, [taskId]: task };
      });
      setBoards(prev => {
        const firstEl = prev[0];
        const restOfBoard = prev.slice(1);

        return [
          {
            ...firstEl,
            taskIds: [
              ...firstEl.taskIds,
              taskId
            ],
          },
          ...restOfBoard]
      })
    },
    []
  );

  const removeTodo = useCallback((id: string) => {
    setTasksMap((prev) => {
      const newMap: TaskMap = Object.create(prev);
      delete newMap[id];

      return newMap;
    });
    setBoards((prev) => {
      return prev.map(board => ({
        ...board,
        taskIds: board.taskIds.filter(taskId => taskId !== id)
      }))
    })
  }, []);

  const checkClicked = useCallback((id: string) => {
    setTasksMap((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          check: !prev[id].check,
        },
      };
    });
  }, []);

  const toggleChecks = useCallback(() => {
    setTasksMap((prev) => {
      const taskIds = Object.keys(prev);
      const newMap: TaskMap = {};

      for (const taskId of taskIds) {
        newMap[taskId] = {
          ...prev[taskId],
          check: todoActiveCounter === 0 ? false : true,
        };
      }

      return newMap;
    });
  }, [todoActiveCounter]);

  const sortByName = useCallback((sort: SorterType) => {
    setSorters(sort);
  }, []);

  /* DND */
  const [draggableTask, setDraggableTask] = useState<null | TaskType>(null);
  const [draggableBoard, setDraggableBoard] = useState<null | BoardType>(null);

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

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, task: TaskType, board: BoardType) => {
    setDraggableTask(task);
    setDraggableBoard(board);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    targetBoard: BoardType,
    targetTask?: TaskType,
  ) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";

    if (draggableTask === null || draggableBoard === null) {
      return;
    }

    if (target.className === "TodoAppBox") {
      const draggableTaskIndex = draggableBoard.taskIds.indexOf(draggableTask.id);
      const dropIndex = targetBoard.taskIds.indexOf(targetTask.id);

      setBoards((prev) => {
        return prev.map(board => {
          if (board.id === targetBoard.id && targetBoard.id === draggableBoard.id) {
            const newTaskIds = [...board.taskIds];
            newTaskIds.splice(draggableTaskIndex, 1);
            newTaskIds.splice(dropIndex, 0, draggableTask.id);

            return {
              ...board,
              taskIds: newTaskIds,
            }
          }

          if (board.id === targetBoard.id) {
            const newTaskIds = [...board.taskIds];
            newTaskIds.splice(dropIndex, 0, draggableTask.id)

            return {
              ...board,
              taskIds: newTaskIds,
            }
          }

          if (board.id === draggableBoard.id) {
            const newTaskIds = [...board.taskIds];
            newTaskIds.splice(draggableTaskIndex, 1)

            return {
              ...board,
              taskIds: newTaskIds,
            }
          }

          return board;
        })
      })
      // setDraggableTask(null);
      // setDraggableBoard(null);
    }
  };

  // const dropOnBoardHandler = (e: React.DragEvent<HTMLDivElement>, board: BoardType) => {
  //   const target = e.target as HTMLDivElement;

  //   if (currentTask === null || currentBoard === null) {
  //     return;
  //   }
  //   if (target.className !== "TodoAppBox") {
  //     board.items.push(currentTask);
  //     const currentIndex = currentBoard.items.indexOf(currentTask);
  //     currentBoard.items.splice(currentIndex, 1);
  //     setCurrentTask(null);
  //   }
  // };

  return (
    <>
      <h1>Todos</h1>
      <div className="page">
        <div className="TodoApp">
          <button
            type="button"
            className="boardButton"
            onClick={addBoard}
          ></button>
          <TodoAppHeader check={toggleChecks} create={createNewTodo} />

          <div className="boardSpace">
            {boards.map((board) => (
              <div
                key={board.id}
                className="board"
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board)}
              >
                <h1>{board.title}</h1>
                {board.taskIds.map((taskId) => {
                  const task = tasksMap[taskId];

                  return (
                    <div
                      key={taskId}
                      draggable={true}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, task, board)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, board, task)}
                    >
                      <TodoAppTask
                        remove={() => removeTodo(task.id)}
                        onCheckClicked={() => checkClicked(taskId)}
                        task={task}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <TodoAppFooter
            counter={todoActiveCounter}
            onFilterChange={setFilters}
            onSortingChange={sortByName}
          />
        </div>
      </div>
    </>
  );
}
