import { useCallback } from "react";
import "./Footer.css";
import { Button } from "../UI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  statusFilterChanged,
  StatusFilters,
  statusSearchChanged,
  statusSorterChanged,
  StatusSorters,
} from "../../redux";
import { useModalContext } from "../Modals";

export const Footer = () => {
  const search = useAppSelector((state) => state.Filters.statusSearch);
  const dispatch = useAppDispatch();

  const { openModal } = useModalContext();

  const filterValue = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(statusSorterChanged(event.target.value));
    },
    [dispatch]
  );
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
      <input
        type="text"
        className="footerInput"
        placeholder="Фильтр..."
        onChange={(e) =>
          dispatch(statusSearchChanged(e.target.value.toLowerCase()))
        }
        value={search}
      />
      <nav className="footerFilter">
        <select className="footerSelector" onChange={filterValue}>
          <option value={StatusSorters.OFF} key="OFF">
            Сортировка отключена
          </option>
          <option value={StatusSorters.aTOb} key="aTOb">
            По заголовку (А-Я)
          </option>
          <option value={StatusSorters.bTOa} key="bTOa">
            По заголовку (Я-А)
          </option>
        </select>
        <button
          className="footerNavButton"
          value="ALL"
          onClick={() => dispatch(statusFilterChanged(StatusFilters.All))}
        >
          All
        </button>
        <button
          className="footerNavButton"
          value="COMPLETED"
          onClick={() => dispatch(statusFilterChanged(StatusFilters.Completed))}
        >
          Completed
        </button>
        <button
          className="footerNavButton"
          value="ACTIVE"
          onClick={() => dispatch(statusFilterChanged(StatusFilters.Active))}
        >
          Active
        </button>
      </nav>
    </footer>
  );
};
