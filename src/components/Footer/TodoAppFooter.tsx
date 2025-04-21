import { FilterType } from "../../types";
import "./TodoAppFooter.css";

type TodoFooterProps = {
  counter: number;
  onClickFilter: (filterType: FilterType) => void;
};

export const TodoAppFooter = (props: TodoFooterProps) => {

  const { onClickFilter, counter } = props;
  
  return (
    <footer>
      <span className="footerCounter">Tasks Left: {counter}</span>
      <nav className="footerFilter">
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
