import { Image } from "../../common/image/Image";
import "./PwBar.scss";

export const PwBar = () => {
  return (
    <div className="pwBar">
      <div className="pwBar-main">
        <div className="pwBar-main-left">
          <Image src="logoPW.png" alt="pwLogo" />
          <h4>Politechnikum Warszawskie</h4>
        </div>
        <Image src="TradeEITI.png" alt="pwBuilding" />
      </div>
      <div className="pwBar-under"></div>
    </div>
  );
};
