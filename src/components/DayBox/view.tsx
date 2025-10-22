import "./module.css";

interface Props {
  active: boolean;
  disabled?: boolean;
  missedTime?: boolean;
  onClick: () => void;
  item: {
    date: string;
    type: string;
  };
}

const DayBox = ({ active, disabled, missedTime, item, onClick }: Props) => {
  return (
    <div
      className={`cursor-pointer rounded-[4px] text-white px-1 py-2 ${
        active ? "bg-textGreen" : "bg-darkPurple"
      } ${disabled && "bg-warning"} ${missedTime && "bg-gray"}`}
      onClick={onClick}
    >
      {/* <div className="text-center mb-2">{item?.day}</div> */}
      <div className="text-center">{item?.date}</div>
    </div>
  );
};

export default DayBox;
