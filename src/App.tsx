import { useMemo, useState, useCallback } from "react";
import { TodoAppTask, TodoAppHeader, TodoAppFooter } from "./components";
import { todoListDefault, boardsDefault } from "./todoListDefault";
import { FilterType, SorterType, TaskType } from "./types";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { DndWrapperList } from "./components/DndWrapperList";

export function App() {
  const [todoTasks, setTodoTasks] = useState(todoListDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  const [boards, setBoards] = useState(boardsDefault);

  const filteredTasks = useMemo(() => {
    if (filters === FilterType.ACTIVE) {
      return todoTasks.filter((t) => t.check !== true);
    }
    if (filters === FilterType.COMPLETED) {
      return todoTasks.filter((t) => t.check == true);
    }
    return todoTasks;
  }, [filters, todoTasks]);

  const visibleTasks = useMemo(() => {
    if (sorters === SorterType.aTOb) {
      return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sorters === SorterType.bTOa) {
      return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
    }
    return filteredTasks;
  }, [filteredTasks, sorters]);

  const todoActiveCounter = useMemo(() => {
    return todoTasks.filter((t) => t.check !== true).length;
  }, [todoTasks]);

  const createNewTodo = useCallback(
    (title: string, text: string, date: Date | null) => {
      setTodoTasks((prev) => {
        return [
          ...prev,
          { title, text, id: Date.now(), check: false, date, boardID: "1" },
        ].sort((a, b) => a.boardID.localeCompare(b.boardID));
      });
    },
    [],
  );

  const addBoard = () => {
    setBoards((prev) => {
      return [...prev, { id: String(Date.now()), title: "test" }];
    });
  };

  const removeTodo = useCallback((id: number) => {
    setTodoTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const checkClicked = useCallback((id: number) => {
    setTodoTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            check: !task.check,
          };
        }

        return task;
      }),
    );
  }, []);

  const toggleChecks = useCallback(() => {
    if (todoActiveCounter == 0) {
      setTodoTasks((prev) => prev.map((task) => ({ ...task, check: false })));
    } else
      setTodoTasks((prev) => prev.map((task) => ({ ...task, check: true })));
  }, [todoActiveCounter]);

  const sortByName = useCallback((sort: SorterType) => {
    setSorters(sort);
  }, []);

  // const dragBoardStartHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   board: BoardType,
  // ) => {
  //   currentBoardRef.current = board;
  // };

  // const dropOnBoardHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   board: BoardType,
  // ) => {
  //   const target = e.target as HTMLDivElement;
  //   const currentTask = currentTaskRef.current;
  //   const currentBoard = currentBoardRef.current;

  //   if (currentBoard === null) {
  //     return;
  //   }

  //   if (currentTask === null) {
  //     const newBoards = [...boards];
  //     const currentIndex = newBoards.indexOf(currentBoard);
  //     const dropIndex = newBoards.indexOf(board);
  //     newBoards.splice(currentIndex, 1);
  //     newBoards.splice(dropIndex, 0, currentBoard);
  //     setBoards(newBoards);
  //   }

  //   const newTodoTasks = [...todoTasks];
  //   if (target.className !== "TodoAppBox" && currentTask !== null) {
  //     currentTask.boardID = board.id;
  //     newTodoTasks.push(currentTask);
  //     const currentIndex = newTodoTasks.indexOf(currentTask);
  //     newTodoTasks.splice(currentIndex, 1);
  //     newTodoTasks.sort((a, b) => a.boardID.localeCompare(b.boardID));
  //     setTodoTasks(newTodoTasks);
  //   }
  // };

  const onDragEndNew = useCallback((startItem: TaskType, endItem: TaskType) => {
    console.log({ startItem, endItem });

    const newTodoTasks = [...todoTasks];

    const currentIndex = newTodoTasks.indexOf(startItem);
    const endBoardId = endItem.boardID;

    if (startItem.boardID !== endBoardId) {
      startItem.boardID = endBoardId;
      newTodoTasks.splice(currentIndex, 1);
      const dropIndex = newTodoTasks.indexOf(endItem);
      newTodoTasks.splice(dropIndex, 0, startItem);
    } else {
      const dropIndex = newTodoTasks.indexOf(endItem);
      newTodoTasks.splice(currentIndex, 1);
      newTodoTasks.splice(dropIndex, 0, startItem);
    }
    newTodoTasks.sort((a, b) => a.boardID.localeCompare(b.boardID));
    setTodoTasks(newTodoTasks);
  }, [todoTasks]);

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
            <DndWrapperList
              sectionData={boards}
              renderSection={(board, children) => <div className="board">
                <h1>{board.title}</h1>
                {children}
              </div>}
              itemData={visibleTasks}
              renderItem={(task) => <TodoAppTask
                remove={() => removeTodo(task.id)}
                onCheckClicked={() => checkClicked(task.id)}
                task={task}
                key={task.id}
              />}
              onDragEnd={onDragEndNew}
            />
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
