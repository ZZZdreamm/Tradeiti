import { Offer } from "../../models/Offer";
import { MyOfferComponent } from "./MyOffer";

interface Props {
  offers: Offer[];
}

export function MyOffersList({ offers }: Props) {
  return (
    <div className="myOffersList">
      {offers &&
        offers.map((offer) => (
          <MyOfferComponent key={offer.offer_id} offer={offer} />
        ))}
    </div>
  );
}
