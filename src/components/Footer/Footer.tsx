import { useCallback, useState } from "react";
import "./Footer.css";
import { Button, Select } from "../UI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  statusFilterChanged,
  StatusFilters,
  statusSearchChanged,
  statusSorterChanged,
} from "../../redux";
import { useModalContext } from "../Modals";
import { selectOptions } from "../../todoListDefault";
import { selectFooter } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export const Footer = () => {
  const search = useAppSelector((state) => state.Filters.statusSearch);
  const filter = useAppSelector((state) => state.Filters.statusFilter);
  const dispatch = useAppDispatch();
  const { openModal } = useModalContext();
  const [selectValue, setSelectValue] = useState<selectFooter>(
    selectOptions[0],
  );

  const filterValue = useCallback(
    (optionsValue: selectFooter) => {
      dispatch(statusSorterChanged(optionsValue.value));
      setSelectValue(optionsValue);
    },
    [dispatch],
  );

  const onFilterChangeClick = () => {
    if (filter == "All") {
      dispatch(statusFilterChanged(StatusFilters.Completed));
    } else if (filter == "Completed") {
      dispatch(statusFilterChanged(StatusFilters.Active));
    } else dispatch(statusFilterChanged(StatusFilters.All));
  };

  return (
    <footer className="Footer">
      <Button
        onClick={() =>
          openModal({
            type: "ModalTaskCreate",
          })
        }
        text="Добавить задачу"
        variant="primary"
      />
      <div className="footerRightSide">
        <input
          type="text"
          className="footerInput"
          placeholder="Фильтр..."
          onChange={(e) =>
            dispatch(statusSearchChanged(e.target.value.toLowerCase()))
          }
          value={search}
        />
        <div className="footerActiveSort">
          <FontAwesomeIcon
            icon={filter == "Active" ? faCircle : faCircleCheck }
            className={`${filter == "Completed" ? "UICheckedBox" : filter == "Active" ? "UIActiveCheckedBox" : "UIUnCheckedBox"} `}
            onClick={onFilterChangeClick}
          />
        </div>
        <nav className="footerFilter">
          <Select
            options={selectOptions}
            onChangeValue={filterValue}
            value={selectValue}
            contentPos="top"
          />
        </nav>
      </div>
    </footer>
  );
};
