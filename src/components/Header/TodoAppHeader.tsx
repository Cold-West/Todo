import { useState } from "react";
import "./TodoAppHeader.css";
import DatePicker from "react-datepicker";
type TodoHeaderProps = {
  create: (title: string, text: string, date: Date | null) => void;
  check: () => void;
};

export const TodoAppHeader = (props: TodoHeaderProps) => {
  const { create, check } = props;

  const [todoTitle, setTodoTitle] = useState("");
  const [todoText, setTodoText] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoTitle !== "") {
      create(todoTitle, todoText, startDate);
      setTodoTitle("");
      setTodoText("");
      setStartDate(new Date());
    } else alert("поле не может быть пустым");
  };
  return (
    <header>
      <button type="button" className="TodoAppCheckAll" onClick={check}>
        ✓
      </button>
      <div className="headerInputs">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Что надо сделать?"
            className="TodoAppInput"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </form>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Описание"
            className="TodoAppInput"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </form>
      </div>
      <DatePicker
        closeOnScroll={(e) => e.target === document}
        className="headerDatePickerInput"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </header>
  );
};
