import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const Logo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(APP_ROUTES.SERVICE)}
      className="flex md:items-center items-start gap-6 uppercase cursor-pointer text-[170%] max-md:w-[50px] max-md:h-[50px] max-md:overflow-hidden"
    >
      <LazyLoadImage
        src={ASSETS.logo}
        wrapperClassName="md:h-[80px] h-[50px] md:max-w-[100px] max-md:min-w-[50px]"
        className="w-full h-full object-contain"
        effect="opacity"
        alt=""
      />
      {t("logo")}
    </div>
  );
};

export default Logo;
