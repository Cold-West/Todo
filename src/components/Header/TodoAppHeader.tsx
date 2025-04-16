import { useState } from "react";
import "./TodoAppHeader.css";

type TodoHeaderProps = {
  create: (text: string) => void;
  check: () => void;
};

export const TodoAppHeader = (props: TodoHeaderProps) => {
  const { create, check } = props;

  const [todoText, setTodoText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText !== "") {
      create(todoText);
      setTodoText("");
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
    </header>
  );
};
