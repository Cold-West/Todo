import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IdTaskType } from "../../types";
import { CheckBox } from "../UI";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "./TaskList.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteTask,
  editTask,
  fetchTasks,
  visibleTasksSelector,
} from "../../redux/taskList/taskListSlice";
import { useModalContext } from "../Modals";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TaskList = () => {
  const currentBoard = useAppSelector((state) => state.Boards.currentBoard);

  const dispatch = useAppDispatch();

  const visibleTasks = useSelector(visibleTasksSelector);

  const { openModal } = useModalContext();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const boardTasks = visibleTasks.filter(
    (task: IdTaskType) => task.task.boardID === currentBoard,
  );

  return (
    <div className="AppTaskList">
      {boardTasks.length ? (
        boardTasks.map((newTask) => (
          <div className="TaskBox">
            <div className="TaskTop">
              <div className="TaskCheck">
                <CheckBox
                  check={newTask.task.check}
                  onClick={() =>
                    dispatch(
                      editTask({
                        id: newTask.id,
                        task: { ...newTask.task, check: !newTask.task.check },
                      }),
                    )
                  }
                />
              </div>
              <div className="TaskTopInfo">
                <div className="TaskMainInfo">
                  <h2 className="TaskTitle">{newTask.task.title}</h2>
                  <div className="TaskRightSide">
                    <button
                      className="TaskButton"
                      onClick={() =>
                        openModal({
                          type: "ModalTaskEdit",
                          payload: { newTask },
                        })
                      }
                    >
                      Редактировать
                    </button>
                    <button
                      className="TaskButton"
                      onClick={() => dispatch(deleteTask(newTask.id))}
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <div className="TaskDate">
                  <FontAwesomeIcon icon={faClock} className="TaskDateIcon" />
                  <DatePicker
                    className="datePickerInput"
                    selected={
                      newTask.task.date ? new Date(newTask.task.date) : null
                    }
                    onChange={(date) =>
                      dispatch(
                        editTask({
                          id: newTask.id,
                          task: {
                            ...newTask.task,
                            date: date ? date.toString() : null,
                          },
                        }),
                      )
                    }
                    dateFormat="MMMM d"
                  />
                </div>
              </div>
            </div>
            <div className="TaskText">{newTask.task.text}</div>
          </div>
        ))
      ) : (
        <h1 className="AppNoTasks">Нет задач</h1>
      )}
    </div>
  );
};
