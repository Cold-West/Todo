import { ChangeEvent, useCallback } from "react";
import "./Footer.css";
import { Button } from "../UI";
import { useAppDispatch } from "../../app/hooks";
import { statusFilterChanged, StatusFilters, statusSorterChanged, StatusSorters } from "../../redux";

type TodoFooterProps = {
  createTask: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

export const Footer = (props: TodoFooterProps) => {
  const { createTask, searchValue, onChange } =
    props;
    const dispatch = useAppDispatch();

  const filterValue = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(statusSorterChanged(event.target.value));
    },
    [dispatch],
  );
  return (
    <footer className="Footer">
      <Button onClick={createTask} text="Добавить задачу" variant="primary" />
      <input
        type="text"
        className="footerInput"
        placeholder="Фильтр..."
        onChange={onChange}
        value={searchValue}
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
          onClick={()=> dispatch(statusFilterChanged(StatusFilters.All))}
        >
          All
        </button>
        <button
          className="footerNavButton"
          value="COMPLETED"
          onClick={()=> dispatch(statusFilterChanged(StatusFilters.Completed))}
        >
          Completed
        </button>
        <button
          className="footerNavButton"
          value="ACTIVE"
          onClick={()=> dispatch(statusFilterChanged(StatusFilters.Active))}
        >
          Active
        </button>
      </nav>
    </footer>
  );
};
