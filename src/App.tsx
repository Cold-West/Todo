import { useState } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

export function App() {
  const [arr, setArr] = useState([1,2,3,4,5]);

  return (
    <>
      <h1>Массив</h1>
      <div>{arr.toString()}</div>
      <button
        onClick={() => {
          arr.push(10);
          console.log({ arr });
        }}
      >
        Сделать arr.push(10)
      </button>
      <button
        onClick={() => {
          setArr(prev => {
            console.log({ prev, arr })
            return arr;
          });
        }}
      >
        Сделать setArr(arr)
      </button>
      <button
        onClick={() => {
          const newArr = [...arr];
          newArr.push(10);
          setArr(newArr);
        }}
      >
        Сделать setArr() с пушем
      </button>
    </>
  );
}
