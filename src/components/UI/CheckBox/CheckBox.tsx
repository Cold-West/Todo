import "./CheckBox.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
type CheckBoxType = {
  check: boolean;
  onClick: () => void;
};
export const CheckBox = (props: CheckBoxType) => {
  const { check, onClick } = props;
  return (
    <FontAwesomeIcon
      icon={check ? faCircleCheck : faCircle}
      className={`${check ? "UICheckedBox" : "UIUnCheckedBox"} `}
      onClick={onClick}
    />
  );
};
