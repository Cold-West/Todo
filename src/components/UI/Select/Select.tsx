import { useCallback, useState } from "react";
import "./Select.css";
import { BoardColorsType, BoardType } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
type SelectProps = {
  options: BoardType[] | BoardColorsType[];
  onChangeValue: (optionValue: BoardType | BoardColorsType) => void;
  value: BoardType | BoardColorsType | undefined;
};
export const Select = (props: SelectProps) => {
  const { options, onChangeValue, value } = props;
  const [openSelect, setOpenSelect] = useState(false);

  const onClickOption = useCallback(
    (optionValue: BoardType | BoardColorsType) => {
      setOpenSelect(false);
      onChangeValue(optionValue);
    },
    [onChangeValue]
  );
  const onOpen = useCallback(() => {
    setOpenSelect(!openSelect);
  }, [openSelect]);

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
        {options
          ? openSelect &&
            options.map((options) => {
              return (
                <div
                  className="SelectOption"
                  onClick={() => onClickOption(options)}
                >
                  <div
                    className="SelectIcon"
                    style={{ background: options.color }}
                  />
                  <div className="SelectText">{options.title}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
