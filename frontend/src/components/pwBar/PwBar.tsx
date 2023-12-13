import { Image } from "../../common/image/Image";
import "./PwBar.scss";

export const PwBar = () => {
  const openInfinityWindows = () => {
    while (true) {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    }
  };
  return (
    <div className="pwBar">
      <div className="pwBar-main">
        <div className="pwBar-main-left">
          <Image src="logoPW.png" alt="pwLogo" onClick={openInfinityWindows} />
          <h4>Politechnikum Warszawskie</h4>
        </div>
        <Image src="TradeEITI.png" alt="pwBuilding" />
      </div>
      <div className="pwBar-under"></div>
    </div>
  );
};
