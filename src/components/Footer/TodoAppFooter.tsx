import { useCallback } from "react";
import { FilterType, SorterType } from "../../types";
import "./TodoAppFooter.css";

type TodoFooterProps = {
  onFilterChange: (filterType: FilterType) => void;
  onSortingChange: (sortingType: SorterType) => void;
  create: () => void;
};

export const TodoAppFooter = (props: TodoFooterProps) => {
  const { onFilterChange, onSortingChange, create } = props;

  const filterValue = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSortingChange(event.target.value as SorterType);
    },
    [onSortingChange],
  );
  return (
    <footer className="TodoFooter">
      <button className="footerAddTask" onClick={() => create()}>Добавить задачу</button>
      <input type="text" className="footerInput" placeholder="Фильтр..." />
      <nav className="footerFilter">
        <select className="footerSelector" onChange={filterValue}>
          <option value={SorterType.OFF} key="OFF">
            Сортировка отключена
          </option>
          <option value={SorterType.aTOb} key="aTOb">
            По заголовку (А-Я)
          </option>
          <option value={SorterType.bTOa} key="bTOa">
            По заголовку (Я-А)
          </option>
        </select>
        <button
          className="footerNavButton"
          value="ALL"
          onClick={() => onFilterChange(FilterType.ALL)}
        >
          All
        </button>
        <button
          className="footerNavButton"
          value="COMPLETED"
          onClick={() => onFilterChange(FilterType.COMPLETED)}
        >
          Completed
        </button>
        <button
          className="footerNavButton"
          value="ACTIVE"
          onClick={() => onFilterChange(FilterType.ACTIVE)}
        >
          active
        </button>
      </nav>
    </footer>
  );
};
