import { Image } from "../../common/image/Image";
import "./style.scss";

export function Footer() {
  return (
    <div className="footer-placeholder">
      <section className="footer">
        <Image src="TradeEITI.png" />
        <article className="text-2sm">
          <span className="bold footer-title">Politechnikum Warniawskie</span>
          <span>pl. Krakowski 15, 10-101 Warniawa</span>
          <span>tel: (22) 999 9999</span>
          <a>https://war.com</a>
        </article>
        <article className="text-2sm">
          <span className="bold footer-title">TradeEITI</span>
          <span>pl. Marcina 21, 10-101 Warniawskie</span>
          <span>tel: (22) 111 1111</span>
          <a>https://trade.eiti</a>
        </article>
      </section>
    </div>
  );
}
