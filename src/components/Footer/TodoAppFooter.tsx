import { FilterType } from "../../types";
import "./TodoAppFooter.css";

type TodoFooterProps = {
  counter: number;
  onClickFilter: (filterType: FilterType) => void;
  filterByName: (value: string) => void;
};

export const TodoAppFooter = (props: TodoFooterProps) => {
  const { onClickFilter, counter, filterByName } = props;

  return (
    <footer>
      <span className="footerCounter">Tasks Left: {counter}</span>
      <nav className="footerFilter">
        <select
          className="footerSelector"
          onChange={(event) => filterByName(event.target.value)}
        >
          <option value="off" key="off">
            Сортировка
          </option>
          <option value="aTOb" key="aTOb">
            По заголовку (А-Я)
          </option>
          <option value="bTOa" key="bTOa">
            По заголовку (Я-А)
          </option>
        </select>
        <button
          className="footerNavButton"
          value="ALL"
          onClick={() => onClickFilter(FilterType.ALL)}
        >
          All
        </button>
        <button
          className="footerNavButton"
          value="COMPLETED"
          onClick={() => onClickFilter(FilterType.COMPLETED)}
        >
          Completed
        </button>
        <button
          className="footerNavButton"
          value="ACTIVE"
          onClick={() => onClickFilter(FilterType.ACTIVE)}
        >
          active
        </button>
      </nav>
    </footer>
  );
};
