import "./NavBar.css";
import { BoardType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BoardListChange } from "../../redux";
import { useModalContext } from "../Modals";

export const NavBar = () => {
  
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.Boards.currentBoard);
  const todoTasks = useAppSelector((state) => state.Tasks.value);
  const boards = useAppSelector((state) => state.Boards.value);

  const { openModal } = useModalContext();

  const onBoardEdit = (board: BoardType, e: React.MouseEvent) => {
    e.stopPropagation();
    openModal({
      type: "ModalBoardEdit",
      payload: { board },
    });
  };
  
  const navBarIconCounter = useCallback(
    (board: BoardType) => {
      return todoTasks.filter((t) => t.boardID === board.id).length;
    },
    [todoTasks]
  );

  return (
    <nav className="navLeft">
      <h1 className="navTitle">Секции Задач</h1>
      <div className="navSection">
        {boards.map((board) => (
          <div
            onClick={() => dispatch(BoardListChange(board.id))}
            className={`navBoard ${currentBoard === board.id ? "navActive" : ""}`}
          >
            <div className="navBoardBox">
              <div
                className="navSectionIcon"
                style={{ background: board.color }}
              >
                {navBarIconCounter(board)}
              </div>
              <div className="navBoardTitle">{board.title}</div>
            </div>
            <FontAwesomeIcon
              icon={faPen}
              className="navModalEditIcon"
              onClick={(e) => onBoardEdit(board, e)}
            />
          </div>
        ))}
        <div
          className="navBoard navAdd"
          onClick={() =>
            openModal({
              type: "ModalBoardCreate"
            })
          }
        >
          <FontAwesomeIcon icon={faPlus} className="navAddIcon" />
          <div className="navTitleAdd">Добавить список...</div>
        </div>
      </div>
    </nav>
  );
};
