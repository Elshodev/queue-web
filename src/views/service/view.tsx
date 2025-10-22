import { AccordionHeader } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { ASSETS } from "../../assets/images/assets";
import { CategoriesType } from "../../types/service";
const categories = [
  {
    id: 2,
    name: "Yo'l harakati xavfsizligi xizmati",
    name_uz: "Yo'l harakati xavfsizligi xizmati",
    name_cyrilic: "Йўл ҳаракати хавфсизлиги хизмати",
    name_ru: "Служба безопасности дорожного движения",
    type: {
      int: 1,
      string: "GAI",
    },
  },
  {
    id: 1,
    name: "Migratsiya va fuqarolikni rasmiylashtirish bosh boshqarmasi",
    name_uz: "Migratsiya va fuqarolikni rasmiylashtirish bosh boshqarmasi",
    name_cyrilic: "Миграция ва фуқароликни расмийлаштириш бош бошқармаси",
    name_ru: "Главное управление миграции и оформления гражданства",
    type: {
      int: 2,
      string: "OVIR",
    },
  },
];
const Service = () => {
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <div className="wrapper md:!h-full max-md:pb-14">
        <div className="flex flex-col h-full">
          <div className="text-center md:text-[200%] max-w-[1200px] mx-auto text-[17px] mb-4">
            {t("select_service")}
            <div className="text-[130%] font-[900] uppercase text-darkPurple">
              {t("queue-text")}
            </div>
            {t("queue2")}
            <div className="text-[130%] font-[900] uppercase text-darkPurple">
              {t("queue")}
            </div>
          </div>
          <div className="flex gap-6 max-md:flex-col my-auto justify-center">
            {categories?.map((item: CategoriesType, idx: number) => (
              <AccordionHeader
                onClick={() => {
                  navigate(
                    APP_ROUTES.SUB_SERVICE + `?type=${item?.type?.string}`
                  );
                }}
                className={`!bg-white max-w-[400px] lg:max-w-[500px] w-full`}
                icon={
                  idx === 0 ? (
                    <img src={ASSETS.gai} className="h-[90px] mx-auto" alt="" />
                  ) : (
                    <img
                      src={ASSETS.migratsiya2}
                      className="h-[90px] mx-auto"
                      alt=""
                    />
                  )
                }
                title={
                  (item &&
                    typeof language === "string" &&
                    (item as any)[`name_${language}`]) ||
                  item?.name ||
                  ""
                }
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Modal
        open={modals?.queue}
        onCancel={() => closeModal("queue")}
        centered
        footer={null}
      >
        <Check />
      </Modal>
      <CreateQueueModal
        onCancel={() => {
          closeModal("service");
          setCategory(null);
        }}
        service={category || null}
      /> */}
      {/* <Loading loading={listLoading} /> */}
    </>
  );
};

export default Service;
