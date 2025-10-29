import "./NavBar.css";
import { IdBoardType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BoardListChange, fetchBoards } from "../../redux";
import { useModalContext } from "../Modals";

export const NavBar = () => {
  
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.Boards.currentBoard);
  const todoTasks = useAppSelector((state) => state.Tasks.tasks);
  const boards = useAppSelector((state) => state.Boards.boards);

  const { openModal } = useModalContext();

  useEffect(()=>{
    dispatch(fetchBoards())
  },[dispatch])

  const onBoardEdit = (newBoard: IdBoardType, e: React.MouseEvent) => {
    e.stopPropagation();
    openModal({
      type: "ModalBoardEdit",
      payload: { newBoard },
    });
  };
  
  const navBarIconCounter = useCallback(
    (id:string) => {
      return todoTasks.filter((t) => t.task?.boardID === id).length;
    },
    [todoTasks]
  );

  return (
    <nav className="navLeft">
      <h1 className="navTitle">Секции Задач</h1>
      <div className="navSection">
        {boards.map((newBoard) => (
          <div
            onClick={() => dispatch(BoardListChange(newBoard.id))}
            className={`navBoard ${currentBoard === newBoard.id ? "navActive" : ""}`}
          >
            <div className="navBoardBox">
              <div
                className="navSectionIcon"
                style={{ background: newBoard.board.color }}
              >
                {navBarIconCounter(newBoard.id)}
              </div>
              <div className="navBoardTitle">{newBoard.board.title}</div>
            </div>
            <FontAwesomeIcon
              icon={faPen}
              className="navModalEditIcon"
              onClick={(e) => onBoardEdit(newBoard, e)}
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
