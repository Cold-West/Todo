import { useRef } from "react";
import { BoardType, TaskType } from "../../types";

type DndWrapperListProps = {
  itemData: TaskType[];
  renderItem: (data: TaskType) => JSX.Element;
  sectionData: BoardType[];
  renderSection: (data: BoardType, children: JSX.Element) => JSX.Element;
  onDragEnd: (startItem: TaskType, dropItem: TaskType) => void;
};

export const DndWrapperList = (props: DndWrapperListProps) => {
  const { itemData, renderItem, sectionData, renderSection, onDragEnd } = props;
  const startItem = useRef<false | TaskType>(false);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.className == "TodoAppBox") {
      target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dragStartHandler = (
    _e: React.DragEvent<HTMLDivElement>,
    item: TaskType
  ) => {
    startItem.current = item;
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    dropItem: TaskType
  ) => {
    const target = e.target as HTMLDivElement;
    target.style.boxShadow = "none";

    const startItemValue = startItem.current;

    if (startItemValue === false) {
      return;
    }

    onDragEnd(startItemValue, dropItem);
  };

  return (
    <>
      {sectionData.map((section) => {
        return <div
          key={section.id}
          draggable={true}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
        >
          {renderSection(
            section,
            itemData
              .filter((item) => item.boardID === section.id)
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    draggable={true}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, item)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDrop={(e) => dropHandler(e, item)}
                  >
                    {renderItem(item)}
                  </div>
                );
              })
          )}
        </div>;
      })}
    </>
  );
};
