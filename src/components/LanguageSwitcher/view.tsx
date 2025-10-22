import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FC, useMemo, useState } from "react";
import { RuIcon, UzIcon } from "../../utils/icons";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../helpers/api";
import i18n from "i18next";

interface Props {
  className?: string;
}

const LanguageSwitcher: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "ru",
      icon: <RuIcon />,
      label: t("russian"),
    },
    {
      key: "uz",
      icon: <UzIcon />,
      label: t("uzbek"),
    },
    {
      key: "cyrillic",
      icon: <UzIcon />,
      label: t("cyrilic"),
    },
  ];
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>(
    i18n.language
  );
  const selectedLanguage = useMemo(() => {
    const find: any = items.find((item) => item?.key === selectedLanguageKey);
    return (
      <Space>
        {find?.icon}
        {find?.label}
      </Space>
    );
  }, [selectedLanguageKey]);

  return (
    <Dropdown
      menu={{
        items: items.filter((item) => item?.key !== selectedLanguageKey),
        selectable: true,
        onClick: (e) => {
          setSelectedLanguageKey(e.key);
          changeLanguage(e.key);
          location.reload();
        },
        className: "[&>li]:gap-[8px] !pl-0",
      }}
      className={`${className}`}
    >
      {selectedLanguage}
    </Dropdown>
  );
};

export default LanguageSwitcher;
