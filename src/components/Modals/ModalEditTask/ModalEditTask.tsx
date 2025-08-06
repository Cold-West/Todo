import { ChangeEvent, useCallback, useState } from "react";
import "./ModalEditTask.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { BoardType, TaskType } from "../../../types";
import { Modal } from "./../Modal";
import {
  ButtonPrimary,
  ButtonSecondary,
  CheckBox,
  Input,
  Select,
  Textarea,
} from "./../../UI";
type ModalTaskProps = {
  submit: (modalTask: TaskType) => void;
  setVisible: (arg0: boolean) => void;
  boards: BoardType[];
  visible: boolean;
  value: TaskType;
  modalType: string;
};
export const ModalEditTask = (props: ModalTaskProps) => {
  const { submit, setVisible, visible, boards, value, modalType} = props;
  const [modalTask, setModalTask] = useState<TaskType>(value);
  const selectBoard = boards.find((board)=> board.id === value.boardID)
  const [selectValue, setSelectValue] = useState<BoardType | undefined>(selectBoard);

  const onChangeTitle = useCallback(
    (e) =>
      setModalTask((prev) => {
        return { ...prev, title: e.target.value };
      }),
    []
  );

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setModalTask((prev) => {
        return { ...prev, text: e.target.value };
      }),
    []
  );

  const onChangeDate = useCallback(
    (Date: Date | null) =>
      setModalTask((prev) => {
        return { ...prev, date: Date };
      }),
    []
  );

  const onChangeCheck = useCallback(
    () =>
      setModalTask((prev) => {
        return { ...prev, check: !modalTask.check };
      }),
    [modalTask.check]
  );

  const onChangeBoardId = useCallback(
    (id: string) =>
      setModalTask((prev) => {
        return { ...prev, boardID: id };
      }),
    []
  );

  const onCancel = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalTask.title !== "") {
        submit(modalTask);
        setVisible(false);
      } else alert("Заголовок не может быть пустым");
    },
    [submit, setVisible, modalTask]
  );
  if (modalType === "edit")
    return (
      <Modal setVisible={setVisible} visible={visible}>
        <div className="ModalTask">
          <div className="ModalTaskBody">
            <Input
              onSubmit={onSubmit}
              value={modalTask.title}
              onChange={onChangeTitle}
              plaseholder="Title"
              className="ModalTaskTitle"
            />
            <div className="ModalTaskTextDiv">
              <h2 className="ModalTaskH2">Описание</h2>
              <Textarea
                onSubmit={onSubmit}
                value={modalTask.text}
                onChange={onChangeText}
                className="ModalTaskText"
              />
            </div>
            <div className="ModalTaskAdditional">
              <div className="ModalTaskSection">
                <p>Секция задач</p>
                <Select
                  options={boards}
                  onChangeId={onChangeBoardId}
                  value={selectValue}
                  setValue={setSelectValue}
                />
              </div>
              <div className="ModalTaskSection">
                <p>Дата выполнения</p>
                <div className="ModalTaskDate">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="ModalTaskDateIcon"
                  />
                  <DatePicker
                    className="ModalTaskDatePicker"
                    selected={modalTask.date}
                    onChange={onChangeDate}
                    dateFormat="MMMM d"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ModalTaskFooter">
            <div className="ModalTaskCheck">
              <CheckBox check={modalTask.check} onClick={onChangeCheck} />
              Дело сделано
            </div>
            <div className="ModalTaskButtons">
              <ButtonPrimary
                onClick={onSubmit}
                text="Сохранить"
              ></ButtonPrimary>
              <ButtonSecondary onClick={onCancel} text="Отмена" />
            </div>
          </div>
        </div>
      </Modal>
    );
};
