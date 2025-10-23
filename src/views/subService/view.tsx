import { SnippetsOutlined } from "@ant-design/icons";
import {
  AccordionHeader,
  BackBtn,
  Check,
  CreateQueueModal,
  Loading,
} from "../../components";
import { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { modalsStore } from "../../store";
import { ServiceCardType } from "../../types";
import { useSearchParams } from "react-router-dom";
import CheckOvir from "../../components/Check/viewOvir";
import { useCategories } from "../../hooks";

const SubService = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "GAI";
  const { t } = useTranslation();
  const { modals, closeModal, openModal } = modalsStore();
  const { categories, isLoading } = useCategories(type);
  const [category, setCategory] = useState<ServiceCardType | null>();
  if (isLoading) {
    return <Loading loading={true} />;
  }
  return (
    <>
      <div className="wrapper h-full">
        <div className="flex flex-col h-full max-md:pb-12">
          <div className="text-center md:text-[200%] text-[17px] mb-4">
            {t("select_category")}
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 my-auto pb-6">
            {categories?.map((item: any, idx: number) => (
              <AccordionHeader
                onClick={() => {
                  setCategory(item);
                  openModal("service");
                }}
                className="!bg-white"
                icon={
                  <SnippetsOutlined className="[&>svg]:fill-black md:[&>svg]:text-[48px] [&>svg]:text-[48px] max-md:min-w-[48px]" />
                }
                title={item?.name}
                key={idx}
              />
            ))}
          </div>
          <BackBtn />
        </div>
      </div>
      {modals?.queue &&<Modal
        open={modals?.queue}
        onCancel={() => closeModal("queue")}
        centered
        footer={null}
      >
        <Check />
      </Modal>}
      {modals?.queueOvir &&<Modal
        open={modals?.queueOvir}
        onCancel={() => closeModal("queueOvir")}
        centered
        footer={null}
      >
        <CheckOvir />
      </Modal>}
      {category && (
        <CreateQueueModal
          onCancel={() => {
            closeModal("service");
            setCategory(null);
          }}
          service={category || null}
        />
      )}
    </>
  );
};

export default SubService;
