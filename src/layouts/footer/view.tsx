import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { BackBtn } from "../../components";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== APP_ROUTES.SERVICE && (
        <div className="wrapper">
          <BackBtn />
        </div>
      )}
      <footer className="bg-footer"></footer>
    </>
  );
};

export default Footer;
