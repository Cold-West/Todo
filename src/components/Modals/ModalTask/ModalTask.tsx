import { ChangeEvent, useCallback, useState } from "react";
import "./ModalTask.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { BoardType, ModalTaskType } from "../../../types";
import { INITIAL_MODALTASK_STATE } from "../../../todoListDefault";
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
  create: (modalTask: ModalTaskType) => void;
  setVisible: (arg0: boolean) => void;
  boards: BoardType[];
  visible: boolean;
};
export const ModalTask = (props: ModalTaskProps) => {
  const { create, setVisible, visible, boards } = props;
  const [selectValue, setSelectValue] = useState<BoardType | null>(null);
  const [modalTask, setModalTask] = useState<ModalTaskType>(
    INITIAL_MODALTASK_STATE
  );

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

  const onChangeId = useCallback(
    (id: string) =>
      setModalTask((prev) => {
        return { ...prev, boardID: id };
      }),
    []
  );

  const onCancel = useCallback(() => {
    setVisible(false);
    setModalTask(INITIAL_MODALTASK_STATE);
  }, [setVisible]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (modalTask.title !== "") {
        create(modalTask);
        setModalTask(INITIAL_MODALTASK_STATE);
        setVisible(false);
      } else alert("Заголовок не может быть пустым");
    },
    [create, setVisible, modalTask]
  );
  if (visible)
    return (
      <Modal setVisible={setVisible}>
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
                  onChangeId={onChangeId}
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
