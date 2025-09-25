import { useCallback, useState } from "react";
import "./Select.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
interface TValue {
  color: string;
  title: string;
}
type SelectProps<T> = {
  options: T[];
  onChangeValue: (optionValue: T) => void;
  value: T | undefined;
};
export const Select = <T extends TValue, >(props: SelectProps<T>) => {
  const { options, onChangeValue, value } = props;
  const [openSelect, setOpenSelect] = useState(false);

  const onClickOption = useCallback(
    (optionValue: T) => {
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
          "Выберите цвет..."
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
