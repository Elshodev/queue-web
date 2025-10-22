import { Badge, Button } from "antd";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: () => void;
  className?: string;
  ribbonClassName?: string;
  icon?: ReactNode;
  title?: string;
}

const AccordionHeader: FC<Props> = ({ onClick, className, icon, title }) => {
  const { t } = useTranslation();
  return (
    <Badge.Ribbon text={t("service")}>
      <Button
        type="primary"
        className={`flex flex-col items-start justify-start gap-6 w-full [&>span]:!text-black border border-black py-[40px] md:[&>span]:text-[24px] [&>span]:text-[14px] text-left text-wrap leading-[1.1] h-full hover:shadow-lg hover:border-darkPurple [&>div]:hover:text-darkPurple ${className}`}
        onClick={onClick}
      >
        {icon ? icon : null}
        <div className="lg:text-[24px] md:text-[20px] text-black text-center w-full">
          {title}
        </div>
      </Button>
    </Badge.Ribbon>
  );
};

export default AccordionHeader;
