import { useEffect, useRef, useState } from "react";
import "./Select.css";
import { BoardType } from "../../types";
type SelectProps = {
  selectable: BoardType[];
  onChangeId: (id:string) => void;
};
export const Select = (props: SelectProps) => {
  const { selectable, onChangeId } = props;
  const [selectValue, setSelectValue] = useState<BoardType | null>(null);
  const [openSelect, setOpenSelect] = useState(false);

  // const dropdownRef = useRef<null | HTMLDivElement>(null);
  // useEffect(()=>{
  //   function handler(e){
  //     if (dropdownRef.current){
  //       if(!dropdownRef.current.contains(e.target)){
  //         setOpenSelect(false)
  //       }
  //     }
  //   }
  //   document.addEventListener('click', handler)

  //   return ()=>{
  //     document.removeEventListener('click', handler)
  //   }
  // }) 
  /* не мой код, но хз как пофиксить, тк селект вложен в модалку, то оно не убирается при клике по любому месту модалки, но при клике за модалкой исчезает */

  const onClickOption = (board: BoardType) => {
    setSelectValue(board);
    setOpenSelect(false);
    onChangeId(board.id);
  }
  const onOpen = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <div className="SelectWrapper" /*ref={dropdownRef}*/>
      <div className={`SelectButton ${openSelect ? "SelectButtonActive" : ""}`} onClick={onOpen} >
        {selectValue ? (
          <div className="SelectPlaceHolder">
            <div className="SelectIcon" style={{ background: selectValue.color }} />
            <div className="SelectText">{selectValue.title}</div>
          </div>
        ) : (
          "Выберите секцию..."
        )}
      </div>
        <div className={`SelectContent ${openSelect ? "SelectVisible" : ""}`}>
          {selectable.map((board) => {
            return (
              <div
                className="SelectOption"
                onClick={() => onClickOption(board)}
              >
                <div
                  className="SelectIcon"
                  style={{ background: board.color }}
                />
                <div className="SelectText">{board.title}</div>
              </div>
            );
          })}
        </div>
    </div>
  );
};
