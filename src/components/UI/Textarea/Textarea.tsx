import "./Textarea.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
type InputProps = {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  type?: string;
};
export const Textarea = (props: InputProps) => {
  const { onSubmit, value, onChange, className } = props;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  
  const inputRef = useRef<null | HTMLTextAreaElement>(null);
  const onClickFocus = () => {
    if (focused) inputRef.current?.blur();
    else inputRef.current?.focus();
  };
  return (
    <form onSubmit={onSubmit} className="UITextareaForm">
      <FontAwesomeIcon
        icon={focused ? faCheck : faPen}
        className="UITextareaIcon"
        onClick={onClickFocus}
        onMouseDown={(e) => e.preventDefault()}
      />
      <textarea
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        className={`UITextarea ${className}`}
        ref={inputRef}
      ></textarea>
    </form>
  );
};
