import { useState } from "react";
import "./Select.css";
import { BoardType } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
type SelectProps = {
  options: BoardType[];
  onChangeId: (id: string) => void;
  value: BoardType | undefined;
  setValue: (board: BoardType) => void;
};
export const Select = (props: SelectProps) => {
  const { options, onChangeId, value, setValue } = props;
  const [openSelect, setOpenSelect] = useState(false);

  const onClickOption = (board: BoardType) => {
    setValue(board);
    setOpenSelect(false);
    onChangeId(board.id);
  };
  const onOpen = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <div className="SelectWrapper">
      {openSelect ? (
        <div
          className="SelectCloseWrapper"
          onClick={() => setOpenSelect(false)}
        />
      ) : null}
      <div
        className={`SelectButton ${openSelect ? "SelectButtonActive" : ""}`}
        onClick={onOpen}
      >
        {value ? (
          <div className="SelectPlaceHolder">
            <div className="SelectIcon" style={{ background: value.color }} />
            <div className="SelectText">{value.title}</div>
          </div>
        ) : (
          "Выберите секцию..."
        )}
        <FontAwesomeIcon icon={faAngleDown} className="SelectArrowIcon" />
      </div>
      <div className="SelectContent">
        {openSelect && options.map((board) => {
          return (
            <div
              className="SelectOption"
              onClick={() => onClickOption(board)}
            >
              <div
                className="SelectIcon"
                style={{ background: board.color }}
              />
              <div className="SelectText">{board.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
