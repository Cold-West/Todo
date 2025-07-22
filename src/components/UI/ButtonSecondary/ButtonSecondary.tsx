import "./ButtonSecondary.css"
type ButtonSecondaryProps={
    onClick: (e: React.FormEvent)=> void;
    text?: string;
}
export const ButtonSecondary = (props: ButtonSecondaryProps) => {
    const {onClick, text} = props
    return (
        <button className="UIButtonSecondary" onClick={onClick}>
              {text}
        </button>
    );
};

