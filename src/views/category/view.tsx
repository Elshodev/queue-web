import { useNavigate } from "react-router-dom";
import { AccordionHeader } from "../../components";
import { APP_ROUTES } from "../../router";
import { useTranslation } from "react-i18next";

const Category = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="wrapper h-full">
      <div className="flex flex-col h-full">
        <div className="text-center text-[200%] mb-4">
          {t("select_category")}
        </div>
        <div className="flex flex-col overflow-y-auto gap-2 my-auto">
          <AccordionHeader
            onClick={() => navigate(APP_ROUTES.SERVICE)}
            title={t("individual")}
          />
          <AccordionHeader
            onClick={() => navigate(APP_ROUTES.SERVICE)}
            title={t("entity")}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
