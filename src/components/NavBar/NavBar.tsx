import { useCallback } from "react";
import "./NavBar.css";
import { BoardType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
type NavBarProps = {
  boards:BoardType[];
  setBoards; 
  testClick: (board: BoardType) => void;
  currentBoard: string;
  counter: (board: BoardType) => number;
};

export const NavBar = (props: NavBarProps) => {
  const { testClick, currentBoard, counter, boards, setBoards } = props;

  

  const createNewBoard = useCallback(() => {
    setBoards((prev:BoardType[]) => {
      return [
        ...prev,
        { id: String(Date.now()), title: "test", color: "#104456" },
      ];
    });
  }, [setBoards]);
  return (
    <nav className="navBarLeft">
      <h1 className="navTitle">Секции Задач</h1>
      <div className="navSection">
        {boards.map((board) => (
              <div onClick={() => testClick(board)} className={`navBoard ${currentBoard === board.id ? 'active' : ''}`}>
                <div
                  className="navSectionIcon"
                  style={{ background: board.color }}
                >
                  {counter(board)}
                </div>
                <div className="navBarBoardTitle">{board.title}</div>
              </div>
            )
        )}
        <div className="navBoard" onClick={createNewBoard}>
          <FontAwesomeIcon icon={faPlus} className="navAddIcon"/>
          <div className="navTitleAdd">
            
            Добавить список...
            </div>
        </div>
      </div>
    </nav>
  );
};
