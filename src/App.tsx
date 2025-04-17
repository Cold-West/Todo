import { useMemo, useState, useCallback } from "react";
import { TodoAppTask, TodoAppHeader } from "./components";
import { TodoAppFooter } from "./components/Footer/TodoAppFooter";
import { todoListDefault } from "./todoListDefault";
import { FilterType } from "./types";
import "./App.css";

export function App() {
  const [todoTasks, setTodoTasks] = useState(todoListDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const visibleTasks = useMemo(() => {
    if (filters === FilterType.ALL) {
      return todoTasks;
    } else if (filters === FilterType.COMPLETED) {
      return todoTasks.filter((t) => t.check !== true);
    } else if (filters === FilterType.ACTIVE) {
      return todoTasks.filter((t) => t.check == true);
    }
  }, [todoTasks, filters]);

  const todoActiveCounter = useMemo(() => {
    return todoTasks.filter((t) => t.check !== true).length;
  }, [todoTasks]);

  const createNewTodo = useCallback(
    (text: string) => {
      setTodoTasks((prev) => {
        return [
          ...prev,
          {
            text,
            id: Date.now(),
            check: false,
          },
        ];
      });
    },
    [todoTasks]
  );

  const removeTodo = useCallback((id: number) => {
    setTodoTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const checkClicked = useCallback((id: number) => {
    setTodoTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            check: !task.check,
          };
        }

        return task;
      })
    );
  }, []);

  const toggleChecks = useCallback(() => {
    if (todoActiveCounter == 0) {
      setTodoTasks((prev) => prev.map((task) => ({ ...task, check: false })));
    } else
      setTodoTasks((prev) => prev.map((task) => ({ ...task, check: true })));
  }, [todoActiveCounter]);

  return (
    <>
      <h1>Todos</h1>
      <div className="TodoApp">
        <TodoAppHeader check={toggleChecks} create={createNewTodo} />

        {visibleTasks.map((task) => (
          <TodoAppTask
            remove={() => removeTodo(task.id)}
            onCheckClicked={() => checkClicked(task.id)}
            task={task}
            key={task.id}
          />
        ))}

        <TodoAppFooter counter={todoActiveCounter} onClickFilter={setFilters} />
      </div>
    </>
  );
}
