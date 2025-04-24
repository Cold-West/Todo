import { useMemo, useState, useCallback } from "react";
import { TodoAppTask, TodoAppHeader, TodoAppFooter } from "./components";
import { todoListDefault } from "./todoListDefault";
import { FilterType, SorterType } from "./types";
import "./App.css";

export function App() {
  const [todoTasks, setTodoTasks] = useState(todoListDefault);

  const [filters, setFilters] = useState<FilterType>(FilterType.ALL);

  const [sorters, setSorters] = useState<SorterType>(SorterType.OFF);

  const filteredTasks = useMemo(() => {
    if (filters === FilterType.ACTIVE) {
      return todoTasks.filter((t) => t.check !== true);
    }
    if (filters === FilterType.COMPLETED) {
      return todoTasks.filter((t) => t.check == true);
    }
    return todoTasks;
  }, [filters, todoTasks]);

  const visibleTasks = useMemo(() => {
    if (sorters === SorterType.aTOb) {
      return [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text));
    }
    if (sorters === SorterType.bTOa) {
      return [...filteredTasks].sort((a, b) => b.text.localeCompare(a.text));
    }
    return filteredTasks;
  }, [filteredTasks, sorters]);

  const todoActiveCounter = useMemo(() => {
    return todoTasks.filter((t) => t.check !== true).length;
  }, [todoTasks]);

  const createNewTodo = useCallback((text: string, date: Date | null) => {
    setTodoTasks((prev) => {
      return [...prev, { text, id: Date.now(), check: false, date }];
    });
  }, []);

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

  const sortByName = useCallback((sort: SorterType) => {
    setSorters(sort);
  }, []);
  return (
    <>
      <h1>Todos</h1>
      <div className="page">
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

          <TodoAppFooter
            counter={todoActiveCounter}
            onFilterChange={setFilters}
            onSortingChange={sortByName}
          />
        </div>
      </div>
    </>
  );
}
