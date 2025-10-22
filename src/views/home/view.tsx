import { Button } from "antd";
import { languageList } from "./list";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { changeLanguage } from "../../helpers/api";

const Home = () => {
  const navigate = useNavigate();
  const onClick = (lang: string) => {
    changeLanguage(lang);
    navigate(APP_ROUTES.SERVICE);
  };

  return (
    <div className="wrapper h-full">
      <div className="h-full flex flex-col gap-4 items-center justify-center">
        {languageList.map((item, idx) => (
          <Button
            onClick={() => onClick(item.language)}
            className="w-[70%] py-[1%] h-[auto] uppercase [&>span]:text-[200%]"
            type="primary"
            key={idx}
          >
            {item?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
