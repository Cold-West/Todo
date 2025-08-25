import "./Textarea.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type InputVariant = "input" | "textarea";

type InputProps<V extends InputVariant> = {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  variant: V;
};
export const Textarea = <V extends InputVariant>(props: InputProps<V>) => {
  const { onSubmit, value, onChange, className, variant } = props;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputRef = useRef<{ input?: HTMLInputElement, textarea?: HTMLTextAreaElement }>({});

  const onClickFocus = () => {
    const currentRef = variant === 'input' ? inputRef.current?.input : inputRef.current?.textarea

    if (focused) currentRef?.blur();
    else currentRef?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(e.target.value)
  };

  return (
    <form onSubmit={onSubmit} className="UITextareaForm">
      <FontAwesomeIcon
        icon={focused ? faCheck : faPen}
        className="UITextareaIcon"
        onClick={onClickFocus}
        onMouseDown={(e) => e.preventDefault()}
      />
      {variant === "input" ? (
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={handleChange}
          className={`UIInput ${className}`}
          ref={ref => {
            if (!ref) {
              return
            }

            inputRef.current.input = ref
          }}
        />
      ) : (
        <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={handleChange}
          className={`UITextarea ${className}`}
          ref={ref => {
            if (!ref) {
              return
            }

            inputRef.current.textarea = ref
          }}
        />
      )}
    </form>
  );
};
