import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Input.css";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
type InputProps = {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (e) => void;
  plaseholder: string;
  className?: string;
  type?: string;
};
export const Input = (props: InputProps) => {
  const { onSubmit, value, onChange, plaseholder, className, type } = props;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputRef = useRef(null);
  const onClickFocus = () => {
    inputRef.current.focus();
  };

  return (
    <form onSubmit={onSubmit} className="UIInputForm">
      <FontAwesomeIcon
        icon={focused ? faCheck : faPen}
        className="UIInputIcon"
        onClick={onClickFocus}
      />
      {type === "textarea" ? (
        <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={plaseholder}
          value={value}
          onChange={onChange}
          className={`UIInput ${className}`}
          ref={inputRef}
        />
      ) : (
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          placeholder={plaseholder}
          value={value}
          onChange={onChange}
          className={`UIInput ${className}`}
          ref={inputRef}
        ></input>
      )}
    </form>
  );
};
