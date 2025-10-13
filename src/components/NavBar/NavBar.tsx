import "./NavBar.css";
import { BoardType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { useAppSelector } from "../../app/hooks";
type NavBarProps = {
  createBoard: () => void;
  boardChange: (board: BoardType) => void;
  currentBoard: string;
  onEdit: (board: BoardType) => void;
};

export const NavBar = (props: NavBarProps) => {
  const { boardChange, currentBoard, createBoard, onEdit } = props;
  const todoTasks = useAppSelector((state) => state.Tasks.value);
  const boards = useAppSelector((state)=> state.Boards.value)
  const onBoardEdit = (board: BoardType, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(board);
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
            onClick={() => boardChange(board)}
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
        <div className="navBoard navAdd" onClick={createBoard}>
          <FontAwesomeIcon icon={faPlus} className="navAddIcon" />
          <div className="navTitleAdd">Добавить список...</div>
        </div>
      </div>
    </nav>
  );
};
