import { useState } from "react";
import "./TodoAppHeader.css";
import DatePicker from "react-datepicker";
type TodoHeaderProps = {
  create: (text: string, date: Date | null) => void;
  check: () => void;
};

export const TodoAppHeader = (props: TodoHeaderProps) => {
  const { create, check } = props;

  const [todoText, setTodoText] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText !== "") {
      create(todoText, startDate);
      setTodoText("");
      setStartDate(new Date());
    } else alert("поле не может быть пустым");
  };
  return (
    <header>
      <button type="button" className="TodoAppCheckAll" onClick={check}>
        ✓
      </button>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Что надо сделать?"
          className="TodoAppInput"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
      </form>
      <DatePicker
        closeOnScroll={(e) => e.target === document}
        className="datePickerInput"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </header>
  );
};
