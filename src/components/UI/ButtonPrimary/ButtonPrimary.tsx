import "./ButtonPrimary.css"
type ButtonPrimaryProps={
    onClick: (e: React.FormEvent)=> void;
    text?: string;
}
export const ButtonPrimary = (props: ButtonPrimaryProps) => {
    const {onClick, text} = props
    return (
        <button className="UIButtonPrimary" onClick={onClick}>
              {text}
        </button>
    );
};

