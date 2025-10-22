import { useEffect, useState } from "react";

const Time = () => {
  const [date, setDate] = useState(new Date());
  const timeLocal = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Tashkent" })
  );
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="text-right text-[200%]">
        {timeLocal.getHours()}:
        {timeLocal.getMinutes().toString().padStart(2, "0")}
      </div>
      <div className="text-[110%]">
        {date.getDate()} {monthNames[timeLocal.getMonth()]} {date.getFullYear()}
      </div>
    </div>
  );
};

export default Time;
