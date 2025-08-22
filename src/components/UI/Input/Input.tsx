import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Input.css";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
type InputProps = {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  plaseholder: string;
  className?: string;
};
export const Input = (props: InputProps) => {
  const { onSubmit, value, onChange, plaseholder, className } = props;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputRef = useRef<null | HTMLInputElement>(null);
  const onClickFocus = () => {
    if (focused) inputRef.current?.blur();
    else inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} className="UIInputForm">
      <FontAwesomeIcon
        icon={focused ? faCheck : faPen}
        className="UIInputIcon"
        onClick={onClickFocus}
        onMouseDown={(e) => e.preventDefault()}
      />
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={plaseholder}
        value={value}
        onChange={onChange}
        className={`UIInput ${className}`}
        ref={inputRef}
      />
    </form>
  );
};
