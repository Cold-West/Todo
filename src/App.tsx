import { useMemo, useState, useCallback } from "react";
import {
  TodoAppTask,
  TodoAppHeader,
  TodoAppFooter,
  DragWrapper,
} from "./components";
import { todoListDefault, boardsDefault } from "./todoListDefault";
import { BoardType, FilterType, SorterType, TaskType } from "./types";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

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
    []
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
      })
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

  const dropHandler = useCallback(
    (startItem: TaskType, endItem: TaskType) => {
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
    },
    [todoTasks]
  );

  const dropOnBoardHandler = useCallback(
    (startItem: TaskType | BoardType, endItem: BoardType) => {
      const newTodoTasks = [...todoTasks];
      const checkIfBoard = (input: TaskType | BoardType): input is TaskType => {
        return Object.prototype.hasOwnProperty.call(input, "boardID");
      };
      if (checkIfBoard(startItem)) {
        startItem.boardID = endItem.id;
        newTodoTasks.push(startItem);
        const currentIndex = newTodoTasks.indexOf(startItem);
        newTodoTasks.splice(currentIndex, 1);
        newTodoTasks.sort((a, b) => a.boardID.localeCompare(b.boardID));
        setTodoTasks(newTodoTasks);
      } else {
        const newBoards = [...boards];
        const currentIndex = newBoards.indexOf(startItem);
        const dropIndex = newBoards.indexOf(endItem);
        newBoards.splice(currentIndex, 1);
        newBoards.splice(dropIndex, 0, startItem);
        setBoards(newBoards);
      }
    },
    [todoTasks, boards]
  );

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
            <DragWrapper
              boardData={boards}
              renderBoards={(board, children) => (
                <div className="board">
                  <h1>{board.title}</h1>
                  {children}
                </div>
              )}
              taskData={visibleTasks}
              renderTasks={(task) => (
                <TodoAppTask
                  remove={() => removeTodo(task.id)}
                  onCheckClicked={() => checkClicked(task.id)}
                  task={task}
                  key={task.id}
                />
              )}
              onDrop={dropHandler}
              onDropBoard={dropOnBoardHandler}
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
