import { Button, DatePicker, Form, Modal, Select, message } from "antd";
import { modalsStore } from "../../../store";
import QRCode from "qrcode";
import { useTranslation } from "react-i18next";
import { RegionType, ServiceCardType, FacilityType } from "../../../types";
import { useState } from "react";
import moment from "moment";
import { useRegions, useCreateTicket } from "../../../hooks";
import { useSearchParams } from "react-router-dom";

interface Props {
  service: ServiceCardType | null;
  onCancel: () => void;
}

const CreateQueueModal = ({ service, onCancel }: Props) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "GAI";
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [selectedRegion, setSelectedRegion] = useState<RegionType>();
  const [selectedFacility, setSelectedFacility] = useState<FacilityType>();
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const { modals, openModal, closeModal, setCheck } = modalsStore();
  const createTicketMutation = useCreateTicket();
  const { data: regions, isLoading: regionsLoading } = useRegions();

  // Static time slots
  const timeSlots = [
    "09:00-09:30",
    "09:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
  ];

  const getRegionName = (region: RegionType) => {
    const language = i18n.language;
    switch (language) {
      case "uz":
        return region.nameUz;
      case "cyrilic":
        return region.nameCyrillic;
      default:
        return region.nameRu;
    }
  };

  const getFacilityName = (facility: FacilityType) => {
    const language = i18n.language;
    switch (language) {
      case "uz":
        return facility.nameUz;
      case "cyrilic":
        return facility.nameCyrillic;
      default:
        return facility.nameRu;
    }
  };

  const handleRegionChange = (regionId: string) => {
    const region = regions?.find((r: RegionType) => r.id === regionId);
    setSelectedRegion(region);
    setSelectedFacility(undefined);
    setSelectedTime("");
  };

  const handleFacilityChange = (facilityId: string) => {
    const facility = selectedRegion?.facilities?.find(
      (f: FacilityType) => f.id === facilityId
    );
    setSelectedFacility(facility);
    setSelectedTime("");
  };

  const handleDayChange = (date: any, dateString: string | string[]) => {
    if (date && dateString) {
      const dayString = Array.isArray(dateString) ? dateString[0] : dateString;
      setSelectedDay(dayString);
      setSelectedTime("");
    }
  };

  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTime(timeSlot);
  };

  const generateQRCode = async (link: string) => {
    console.log(link);

    try {
      const qrDataURL = await QRCode.toDataURL(link);
      return qrDataURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };

  const handleSubmit = () => {
    if (
      !selectedRegion ||
      !selectedFacility ||
      !selectedDay ||
      !selectedTime ||
      !service?.id
    ) {
      message.error(t("selectRegionAndFacility"));
      return;
    }

    // Create ticket with the exact API format you specified
    createTicketMutation.mutate(
      {
        serviceId: service.id.toString(),
        facilityId: selectedFacility.id,
        date: selectedDay,
        range: selectedTime,
      },
      {
        onSuccess: (res: any) => {
          if (res) {
            form.resetFields();
            // Generate QR code and include it in check data
            generateQRCode(`${res.servierId} ${res?.id}`)
              .then((qrCodeDataURL) => {
                if (qrCodeDataURL) {
                  // Extract base64 data from data URL
                  const base64Data = qrCodeDataURL.split(",")[1];
                  res.qrCode = base64Data;
                }
                setCheck(res);
                openModal(type === "GAI" ? "queue" : "queueOvir");
              })
              .catch((error) => {
                console.error("QR Code generation failed:", error);
                // Still set check data even if QR code fails
                setCheck(res);
                openModal(type === "GAI" ? "queue" : "queueOvir");
              });
            closeModal("service");
            // Reset all states
            setSelectedRegion(undefined);
            setSelectedFacility(undefined);
            setSelectedDay("");
            setSelectedTime("");
          }
        },
        onError: (err: any) => {
          console.log(err);

          message.error({
            content: err?.response?.data?.message || err,
          });
        },
      }
    );
  };

  const disabledDate = (current: any) => {
    return current && current < moment().startOf("day");
  };

  return (
    <Modal
      title={service?.name}
      open={modals?.service}
      onCancel={onCancel}
      centered
      footer={null}
    >
      <Form form={form} layout="vertical" className="mt-4">
        {/* Region Selection */}
        <Form.Item label={t("selectArea")} required>
          <Select
            size="large"
            className="w-full"
            placeholder={t("selectArea")}
            loading={regionsLoading}
            onChange={handleRegionChange}
            value={selectedRegion?.id}
          >
            {regions?.map((region: RegionType) => (
              <Select.Option value={region.id} key={region.id}>
                {getRegionName(region)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Facility Selection */}
        <Form.Item label={t("selectBranch")} required>
          <Select
            size="large"
            className="w-full"
            placeholder={t("selectBranch")}
            disabled={!selectedRegion}
            onChange={handleFacilityChange}
            value={selectedFacility?.id}
          >
            {selectedRegion?.facilities?.map((facility: FacilityType) => (
              <Select.Option value={facility.id} key={facility.id}>
                {getFacilityName(facility)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Day Selection */}
        <Form.Item label={t("selectDay")} required>
          <DatePicker
            size="large"
            className="w-full"
            disabled={!selectedFacility}
            disabledDate={disabledDate}
            onChange={handleDayChange}
            placeholder={t("selectDay")}
          />
        </Form.Item>

        {/* Time Selection */}
        {selectedDay && (
          <Form.Item label={t("selectDate")} required>
            <div className="grid lg:grid-cols-4 grid-cols-3 gap-2">
              {timeSlots.map((timeSlot: string, idx: number) => (
                <div
                  key={idx}
                  className={`cursor-pointer rounded-[4px] text-white px-1 py-2 text-center ${
                    selectedTime === timeSlot ? "bg-textGreen" : "bg-darkPurple"
                  }`}
                  onClick={() => handleTimeSelect(timeSlot)}
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          </Form.Item>
        )}
      </Form>

      {/* Submit Button */}
      <Button
        type="primary"
        className="w-full mt-4"
        size="large"
        disabled={
          createTicketMutation.isPending ||
          !selectedRegion ||
          !selectedFacility ||
          !selectedDay ||
          !selectedTime
        }
        loading={createTicketMutation.isPending}
        onClick={handleSubmit}
      >
        {t("issueCheck")}
      </Button>
    </Modal>
  );
};

export default CreateQueueModal;
