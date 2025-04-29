import { useMemo, useState, useCallback } from "react";
import { TodoAppTask, TodoAppHeader, TodoAppFooter } from "./components";
import { todoListDefault } from "./todoListDefault";
import { FilterType, SorterType, TaskType } from "./types";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

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
      return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sorters === SorterType.bTOa) {
      return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title));
    }
    return filteredTasks;
  }, [filteredTasks, sorters]);

  const todoActiveCounter = useMemo(() => {
    return todoTasks.filter((t) => t.check !== true).length;
  }, [todoTasks]);

  const createNewTodo = useCallback(
    (title: string, text: string, date: Date | null) => {
      setTodoTasks((prev) => {
        return [...prev, { title, text, id: Date.now(), check: false, date }];
      });
    },
    []
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

  const sortByName = useCallback((sort: SorterType) => {
    setSorters(sort);
  }, []);

  const [currentTask, setCurrentTask] = useState<null | TaskType>(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className == "TodoAppBox") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, task: TaskType) => {
    setCurrentTask(task);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, task: TaskType) => {
    e.target.style.boxShadow = "none";
    if (currentTask === null) {
      return;
    }
    if (e.target.className === "TodoAppBox") {
      const currentIndex = visibleTasks.indexOf(currentTask);
      const dropIndex = visibleTasks.indexOf(task);
      visibleTasks.splice(currentIndex, 1);
      visibleTasks.splice(dropIndex, 0, currentTask);
      setCurrentTask(null);
    }
  };
  const dropOnBoardHandler = (e) => {
    if (currentTask === null) {
      return;
    }
    if (e.target.className !== "TodoAppBox") {
      visibleTasks.push(currentTask);
      const currentIndex = visibleTasks.indexOf(currentTask);
      visibleTasks.splice(currentIndex, 1);
      setCurrentTask(null);
    }
  };
  return (
    <>
      <h1>Todos</h1>
      <div className="page">
        <div className="TodoApp">
          <TodoAppHeader check={toggleChecks} create={createNewTodo} />
          <div
            className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropOnBoardHandler(e)}
          >
            {visibleTasks.map((task) => (
              <TodoAppTask
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, task)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, task)}
                remove={() => removeTodo(task.id)}
                onCheckClicked={() => checkClicked(task.id)}
                task={task}
                key={task.id}
              />
            ))}
          </div>
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
