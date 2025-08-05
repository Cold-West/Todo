import { useMemo, useState, useCallback } from "react";
import {
  TodoAppTask,
  TodoAppFooter,
  DragWrapper,
  NavBar,
  ModalTask,
} from "./components";
import { boardsDefault, todoListDefault } from "./todoListDefault";
import {
  BoardType,
  FilterType,
  ModalTaskType,
  SorterType,
  TaskType,
} from "./types";
import "./App.css";
import "./DefaultColors.css";
import "react-datepicker/dist/react-datepicker.css";

export function App() {
  const [todoTasks, setTodoTasks] = useState(todoListDefault);

  const [boards, setBoards] = useState(boardsDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  const [search, setSearch] = useState("");

  const [currentBoard, setCurrentBoard] = useState("1");

  const [modalVisible, setModalVisible] = useState(false);

  const searchTasks = useMemo(() => {
    if (search) {
      return todoTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.text.toLowerCase().includes(search)
      );
    }
    return todoTasks;
  }, [search, todoTasks]);

  const filteredTasks = useMemo(() => {
    if (filters === FilterType.ACTIVE) {
      return searchTasks.filter((t) => t.check !== true);
    }
    if (filters === FilterType.COMPLETED) {
      return searchTasks.filter((t) => t.check == true);
    }
    return searchTasks;
  }, [filters, searchTasks]);

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

  const createNewTodo = useCallback((modalTask: ModalTaskType) => {
    setTodoTasks((prev) => {
      return [
        ...prev,
        {
          title: modalTask.title,
          text: modalTask.text,
          check: modalTask.check,
          date: modalTask.date,
          boardID: modalTask.boardID,
          id: Date.now(),
        },
      ];
    });
  }, []);

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
        
        <ModalTask
          create={createNewTodo}
          setVisible={setModalVisible}
          visible={modalVisible}
          boards={boards}
          key={`open: ${modalVisible}`}
        />

        <NavBar
          boards={boards}
          setBoards={setBoards}
          testClick={(board) => changeBoadr(board)}
          currentBoard={currentBoard}
          counter={(board) => navBarCounter(board)}
        />
        <div className="rightPanel">
          <div className="TaskList">
            {visibleTasks.filter((task) => task.boardID === currentBoard)
              .length ? (
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
            ) : (
              <h1 className="AppNoTasks">Нет задач</h1>
            )}
          </div>
          <TodoAppFooter
            searchValue={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onFilterChange={setFilters}
            onSortingChange={sortByName}
            create={() => setModalVisible(true)}
          />
        </div>
      </div>
    </>
  );
}
