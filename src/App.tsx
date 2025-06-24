import { useMemo, useState, useCallback, useRef } from "react";
import {
  TodoAppTask,
  TodoAppHeader,
  TodoAppFooter,
  DragWrapper,
  NavBar,
} from "./components";
import { todoListDefault, boardsDefault } from "./todoListDefault";
import {
  BoardType,
  checkIfBoard,
  FilterType,
  SorterType,
  TaskType,
} from "./types";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

export function App() {
  const [todoTasks, setTodoTasks] = useState(todoListDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  const [currentBoard, setCurrentBoard] = useState("1");

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

  const changeBoadr = useCallback((board: BoardType) => {
    setCurrentBoard(board.id);
  }, []);

  const navBarCounter = useCallback(
    (board: BoardType) => {
      return todoTasks.filter((t) => t.boardID === board.id).length;
    },
    [todoTasks]
  );

  const createNewTodo = useCallback(() => {
    setTodoTasks((prev) => {
      return [
        ...prev,
        {
          title: "Сделать дело",
          text: "",
          id: Date.now(),
          check: false,
          date: new Date(),
          boardID: currentBoard,
        },
      ];
    });
  }, [currentBoard]);

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

  return (
    <>
      <div className="page">
        <NavBar
          testClick={(board) => changeBoadr(board)}
          currentBoard={currentBoard}
          counter={(board) => navBarCounter(board)}
        />
        <div className="TaskList">
          <DragWrapper
            taskData={visibleTasks.filter(
              (task) => task.boardID === currentBoard
            )}
            renderTasks={(task) => (
              <TodoAppTask
                remove={() => removeTodo(task.id)}
                onCheckClicked={() => checkClicked(task.id)}
                task={task}
                key={task.id}
              />
            )}
            onDrop={dropHandler}
          />
        </div>
        <TodoAppFooter
          onFilterChange={setFilters}
          onSortingChange={sortByName}
          create={createNewTodo}
        />
      </div>
    </>
  );
}
