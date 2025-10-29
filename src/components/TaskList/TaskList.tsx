import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IdTaskType } from "../../types";
import { DragWrapper } from "../DragWrapper";
import { CheckBox } from "../UI";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "./TaskList.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteTask,
  fetchTasks,
  TaskCheck,
  TaskDateChange,
} from "../../redux/taskList/taskListSlice";
import { useModalContext } from "../Modals";
import { useEffect } from "react";

export const TaskList = () => {
  const currentBoard = useAppSelector((state) => state.Boards.currentBoard);

  const dispatch = useAppDispatch();

  const visibleTasks = useAppSelector((state)=> state.Tasks.tasks);

  const { openModal } = useModalContext();

  useEffect(()=>{
      dispatch(fetchTasks())
    },[dispatch])
  return (
    <div className="AppTaskList">
      {visibleTasks.filter((task: IdTaskType) => task.task.boardID === currentBoard)
        .length ? (
        <DragWrapper
          taskData={visibleTasks.filter(
            (task: IdTaskType) => task.task.boardID === currentBoard
          )}
          renderTasks={(newTask) => (
            <div className="TaskBox">
              <div className="TaskTop">
                <div className="TaskCheck">
                  <CheckBox
                    check={newTask.task.check}
                    onClick={() => dispatch(TaskCheck(newTask.id))}
                  />
                </div>
                <div>
                  <h2 className="TaskTitle">{newTask.task.title}</h2>
                  <FontAwesomeIcon icon={faClock} className="TaskDateIcon" />
                  <DatePicker
                    className="datePickerInput"
                    selected={newTask.task.date}
                    onChange={(date) => dispatch(TaskDateChange(date, newTask.id))}
                    dateFormat="MMMM d"
                  />
                </div>
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
              <div className="TaskText">{newTask.task.text}</div>
            </div>
          )}
        />
      ) : (
        <h1 className="AppNoTasks">Нет задач</h1>
      )}
    </div>
  );
};
