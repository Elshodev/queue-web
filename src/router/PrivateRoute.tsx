import { FC, ReactNode } from "react";
import { Navbar } from "../layouts";

interface Props {
  child?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ child }) => {
  return (
    <>
      <Navbar />
      <div className="py-[23px] h-full overflow-y-auto">{child}</div>
      {/* <Footer /> */}
    </>
  );
};

export default PrivateRoute;
