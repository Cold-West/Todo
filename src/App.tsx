import { useMemo, useState, useCallback, useEffect } from "react";
import { Footer, NavBar, useModalContext, TaskList } from "./components";
import { boardColors } from "./todoListDefault";
import { BoardType, TaskType } from "./types";
import "./App.css";
import "./DefaultColors.css";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "./app/hooks";
import { StatusFilters, StatusSorters } from "./redux";

export function App() {
  const todoTasks = useAppSelector((state) => state.Tasks.value);

  const boards = useAppSelector((state) => state.Boards.value);

  const filters = useAppSelector((state)=> state.Filters.statusFilter) 

  const sorters = useAppSelector((state)=> state.Filters.statusSorter)

  const [search, setSearch] = useState("");

  const [currentBoard, setCurrentBoard] = useState("1");

  useEffect(() => {
    setCurrentBoard((prevCurrentBoard) => {
      const isBoard = boards.some((b) => b.id === prevCurrentBoard);
      if (isBoard) {
        return prevCurrentBoard;
      }
      return boards[0].id;
    });
  }, [boards]);

  const searchTasks = useMemo(() => {
    if (search) {
      return todoTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.text.toLowerCase().includes(search),
      );
    }
    return todoTasks;
  }, [search, todoTasks]);

  const filteredTasks = useMemo(() => {
    if (filters === StatusFilters.Active) {
      return searchTasks.filter((t) => t.check !== true);
    }
    if (filters === StatusFilters.Completed) {
      return searchTasks.filter((t) => t.check == true);
    }
    return searchTasks;
  }, [filters, searchTasks]);

  const visibleTasks = useMemo(() => {
    if (sorters === StatusSorters.aTOb) {
      return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sorters === StatusSorters.bTOa) {
      return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
    }
    return filteredTasks;
  }, [filteredTasks, sorters]);

  const onBoardListChange = useCallback((board: BoardType) => {
    setCurrentBoard(board.id);
  }, []);
  const { openModal } = useModalContext();

  return (
    <>
      <div className="AppPage">
        <NavBar
          onEdit={(board) =>
            openModal({
              type: "ModalBoardEdit",
              payload: {
                boardColors,
                board,
              },
            })
          }
          createBoard={() =>
            openModal({
              type: "ModalBoardCreate",
              payload: {
                boardColors,
              },
            })
          }
          boardChange={(board) => onBoardListChange(board)}
          currentBoard={currentBoard}
        />
        <div className="AppRightPanel">
          <TaskList
            visibleTasks={visibleTasks}
            currentBoard={currentBoard}
            onEdit={(task: TaskType) =>
              openModal({
                type: "ModalTaskEdit",
                payload: { boards, task },
              })
            }
          />
          <Footer
            searchValue={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            createTask={() =>
              openModal({
                type: "ModalTaskCreate",
                payload: { boards, currentBoard },
              })
            }
          />
        </div>
      </div>
    </>
  );
}
