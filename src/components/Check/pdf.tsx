import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { CheckType } from "../../types";
import { useTranslation } from "react-i18next";
import { formatDate, formatTimeRange } from "./view";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
  fontWeight: "normal",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    borderLeft: "1px solid #000",
    borderIrght: "1px solid #000",
    marginTop: 18,
    padding: 4,
  },
  welcome: {
    textAlign: "center",
    marginBottom: 2,
    fontFamily: "Roboto",
  },
  queue: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginTop: 4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  qrcodeBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  qrcode: {
    width: "90px",
    height: "90px",
    display: "flex",
  },
  font: {
    fontFamily: "Roboto",
  },
});

interface Props {
  check?: CheckType;
}

const PdfCheck = ({ check }: Props) => {
  console.log("PDF Check data:", check);

  const { t } = useTranslation();
  return (
    <>
      <Document>
        <Page size="A6" style={styles.page}>
          <View>
            <View>
              <Text style={styles.welcome}>{t("welcome")}</Text>
              <View style={styles.qrcodeBlock}>
                {check?.id && check?.qrCode && (
                  <Image
                    style={styles.image}
                    src={`data:image/png;base64,${check.qrCode}`}
                  />
                )}
              </View>
              <View>
                <Text style={styles.text}>
                  {t("service")}: {check?.service}
                </Text>
                <Text style={styles.text}>
                  {t("date")}: {formatDate(check?.startDate || "")}
                </Text>
                <Text style={styles.text}>
                  {t("timeBooked")}:{" "}
                  {formatTimeRange(
                    check?.startDate || "",
                    check?.endDate || ""
                  )}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PdfCheck;
