import { useMemo, useState, useCallback } from "react";
import { Footer, NavBar, useModalContext, TaskList } from "./components";
import { boardColors, boardsDefault } from "./todoListDefault";
import { BoardType, FilterType, SorterType, TaskType } from "./types";
import "./App.css";
import "./DefaultColors.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "./app/hooks";

export function App() {
  const todoTasks = useAppSelector((state)=> state.Tasks.value)

  const [boards, setBoards] = useState(boardsDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  const [search, setSearch] = useState("");

  const [currentBoard, setCurrentBoard] = useState("1");

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

  const sortByName = useCallback((sort: SorterType) => {
    setSorters(sort);
  }, []);

  const DNDdropHandler = useCallback(
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

  const onBoardCreate = useCallback(
    (modalBoard: BoardType) => {
      setBoards((prev: BoardType[]) => {
        return [
          ...prev,
          {
            id: String(Date.now()),
            title: modalBoard.title,
            color: modalBoard.color,
          },
        ];
      });
    },
    [setBoards]
  );

  const onBoardEdit = useCallback((editedBoard: BoardType) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === editedBoard.id) {
          return {
            title: editedBoard.title,
            color: editedBoard.color,
            id: editedBoard.id,
          };
        }

        return board;
      })
    );
  }, []);

  const onBoardRemove = useCallback(
    (id: string) => {
      setBoards((prev) => prev.filter((b) => b.id !== id));
      if (currentBoard === id) {
        if (boards[0].id === id) {
          setCurrentBoard(boards[1].id);
        } else setCurrentBoard(boards[0].id);
      }
    },
    [currentBoard, boards]
  );

  const onBoardListChange = useCallback((board: BoardType) => {
    setCurrentBoard(board.id);
  }, []);

  const navBarIconCounter = useCallback(
    (board: BoardType) => {
      return visibleTasks.filter((t) => t.boardID === board.id).length;
    },
    [visibleTasks]
  );

  const { openModal } = useModalContext();

  return (
    <>
      <div className="AppPage">
        <NavBar
          boards={boards}
          onEdit={(board) =>
            openModal({
              type: "ModalBoardEdit",
              payload: {
                onSubmit: onBoardEdit,
                onRemove: onBoardRemove,
                boardColors,
                board,
              },
            })
          }
          createBoard={() =>
            openModal({
              type: "ModalBoardCreate",
              payload: {
                onSubmit: onBoardCreate,
                boardColors,
              },
            })
          }
          boardChange={(board) => onBoardListChange(board)}
          currentBoard={currentBoard}
          counter={(board) => navBarIconCounter(board)}
        />
        <div className="AppRightPanel">
          <TaskList
            visibleTasks={visibleTasks}
            currentBoard={currentBoard}
            onDrop={DNDdropHandler}
            onEdit={(task: TaskType) =>
              openModal({
                type: "ModalTaskEdit",
                payload: { boards, task, },
              })
            }
          />
          <Footer
            searchValue={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onFilterChange={setFilters}
            onSortingChange={sortByName}
            createTask={() =>
              openModal({
                type: "ModalTaskCreate",
                payload: { boards, currentBoard},
              })
            }
          />
        </div>
      </div>
    </>
  );
}
