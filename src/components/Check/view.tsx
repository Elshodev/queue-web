import { QRCode } from "antd";
import "./module.css";
import { useTranslation } from "react-i18next";
import { modalsStore } from "../../store";
import PdfCheck from "./pdf";
import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
export const formatDate = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);

  return date.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Tashkent",
  });
};

export const formatTime = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);

  return date.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  });
};

// Band qilingan vaqt oralig'ini formatlash uchun
export const formatTimeRange = (start: string, end: string) => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const Check = () => {
  const { t } = useTranslation();
  const { check } = modalsStore();

  const [printLoading, setPrintLoading] = useState(true);
  let document = <PdfCheck check={check} />;
  
  const [instance, updateInstance] = usePDF({ document });
  const refreshPDF = () => {
    updateInstance(document);
  };
  
  const handlePrint = () => {
    console.log(instance);
    const url = instance?.url;
    if (url) {
      window.open(url, "_blank");
    }
  };
  useEffect(() => {
    if (!instance.loading) {
      setPrintLoading(false);
    } else {
      setPrintLoading(true);
    }
  }, [instance]);

  useEffect(() => {
    refreshPDF();
  }, [check]);

  return (
    <div className="check">
      <div className="check-welcome">{t("welcome")}!</div>
      <div className="check-qr-block">

        <div className="qr">
          <QRCode size={220} value={`${check.servierId} ${check?.id}`} />
        </div>
      </div>
      <div className="strong">
        {t("service")}: {check?.service}
      </div>
      <div className="check-text">
        {t("date")}: {formatDate(check?.startDate)}
      </div>
      <div className="check-text">
        {t("timeBooked")}: {formatTimeRange(check?.startDate, check?.endDate)}
      </div>
      <div className="check-text">{t("required_documents")}:</div>
      <div className="check-text">-{t("identity_documents")}</div>
      <div className="check-text">
        -{t("documents_related_to_motor_vehicles")}
      </div>
      <ul className="check-list">
        <li>{t("transfer_from_coric")}</li>
        <li>{t("payment")}</li>
        <li>{t("list_hall")}</li>
      </ul>
      <button
        disabled={printLoading}
        onClick={handlePrint}
        className="thanks cursor-pointer w-full"
      >
        {t("download")}
      </button>
      <div className="thanks">{t("thanks_for_wait")}!</div>
    </div>
  );
};

export default Check;
