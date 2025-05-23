import { useCallback } from "react";
import { FilterType, SorterType } from "../../types";
import "./TodoAppFooter.css";

type TodoFooterProps = {
  counter: number;
  onFilterChange: (filterType: FilterType) => void;
  onSortingChange: (sortingType: SorterType) => void;
};

export const TodoAppFooter = (props: TodoFooterProps) => {
  const { onFilterChange, counter, onSortingChange } = props;

  const filterValue = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSortingChange(event.target.value as SorterType);
    },
    [onSortingChange]
  );
  return (
    <footer>
      <span className="footerCounter">Tasks Left: {counter}</span>
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
