// import { changeLanguage } from "../../helpers/api";
// import { useTranslation } from "react-i18next";
import { ASSETS } from "../../assets/images/assets";
import { LanguageSwitcher, Logo } from "../../components";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  // const { t, i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <>
      <nav className="py-[0.5%] border-b border-gray bg-[#f2f2f2] z-[99]">
        <div className="wrapper">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex max-md:flex-row-reverse items-center md:gap-8 gap-4">
              {/* <Link to={APP_ROUTES.SERVICE} className="">
                <HomeOutlined className="[&>svg]:text-[26px] [&>svg]:text-darkPurple" />
              </Link> */}
              <LanguageSwitcher />
              <div className="flex gap-4">
                <img
                  src={ASSETS.call}
                  className="min-w-[25px] w-[25px] max-md:h-[32px] h-[50px] object-cover"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <div className="font-700 max-md:hidden">CALL - MARKAZ</div>
                  <div className="font-500 text-[20px]">1102</div>
                </div>
              </div>
              {/* <Time /> */}
            </div>
          </div>
        </div>
      </nav>
      <Alert
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            {t("test")}
          </Marquee>
        }
      />
    </>
  );
};

export default Navbar;
