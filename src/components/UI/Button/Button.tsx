import "./Button.css";
type ButtonProps = {
  onClick: (e: React.FormEvent) => void;
  text?: string;
  variant?: "secondary" | "primary";
};
export const Button = (props: ButtonProps) => {
  const { onClick, text, variant } = props;

  return (
    <button
      className={
        variant === "secondary" ? "UIButtonSecondary" : "UIButtonPrimary"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};
