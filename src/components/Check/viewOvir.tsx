import { QRCode } from "antd";
import "./module.css";
import { useTranslation } from "react-i18next";
import { modalsStore } from "../../store";
import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import PdfCheck from "./pdf";
import { formatDate, formatTimeRange } from "./view";

const CheckOvir = () => {
  const { t } = useTranslation();
  const { check } = modalsStore();
  const [printLoading, setPrintLoading] = useState(true);
  let document = <PdfCheck check={check} />;
  const [instance, updateInstance] = usePDF({ document });
  const refreshPDF = () => {
    updateInstance(document);
  };

  const handlePrint = () => {
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
      <button
        onClick={handlePrint}
        disabled={printLoading}
        className="thanks cursor-pointer w-full"
      >
        {t("download")}
      </button>
      <div className="thanks">{t("thanks_for_wait")}!</div>
    </div>
  );
};

export default CheckOvir;
