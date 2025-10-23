import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div onClick={() => navigate(-1)}>
      <Button
        className="mb-4 uppercase py-[12px] h-[auto] flex items-center justify-center !bg- w-max"
        type="primary"
      >
        <ArrowLeftOutlined className="mr-auto [&>svg]:text-[100%]" />
        <span className="mr-auto md:text-[100%] text-base">{t("back")}</span>
      </Button>
    </div>
  );
};

export default BackBtn;
