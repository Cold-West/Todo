import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskType } from "../../types";
import { DragWrapper } from "../DragWrapper";
import { CheckBox } from "../UI";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "./TaskList.css";
import { useAppDispatch } from "../../app/hooks";
import {
  TaskCheck,
  TaskDateChange,
  TaskRemove,
} from "../../redux/taskList/taskListSlice";

type TaskListProps = {
  visibleTasks: TaskType[];
  currentBoard: string;
  onEdit: (task: TaskType) => void;
};
export const TaskList = (props: TaskListProps) => {
  const { visibleTasks, currentBoard, onEdit } = props;
  const dispatch = useAppDispatch();
  return (
    <div className="AppTaskList">
      {visibleTasks.filter((task) => task.boardID === currentBoard).length ? (
        <DragWrapper
          taskData={visibleTasks.filter(
            (task) => task.boardID === currentBoard,
          )}
          renderTasks={(task) => (
            <div className="TaskBox">
              <div className="TaskTop">
                <div className="TaskCheck">
                  <CheckBox
                    check={task.check}
                    onClick={() => dispatch(TaskCheck(task.id))}
                  />
                </div>
                <div>
                  <h2 className="TaskTitle">{task.title}</h2>
                  <FontAwesomeIcon icon={faClock} className="TaskDateIcon" />
                  <DatePicker
                    className="datePickerInput"
                    selected={task.date}
                    onChange={(date) => dispatch(TaskDateChange(date, task.id))}
                    dateFormat="MMMM d"
                  />
                </div>
                <div className="TaskRightSide">
                  <button className="TaskButton" onClick={() => onEdit(task)}>
                    Редактировать
                  </button>
                  <button
                    className="TaskButton"
                    onClick={() => dispatch(TaskRemove(task.id))}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="TaskText">{task.text}</div>
            </div>
          )}
        />
      ) : (
        <h1 className="AppNoTasks">Нет задач</h1>
      )}
    </div>
  );
};
