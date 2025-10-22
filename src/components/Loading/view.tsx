import { Spin } from "antd";
import { FC } from "react";

interface Props {
  loading: boolean;
}

const Loading: FC<Props> = ({ loading }) => {
  return (
    loading && (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[9999]">
        <Spin className="asd" />
      </div>
    )
  );
};

export default Loading;
