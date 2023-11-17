import { Offer } from "../../models/Offer";
import { OfferComponent } from "./Offer";

interface Props {
  offers?: Offer[];
}

export function OffersList({ offers }: Props) {
  return (
    <div className="offersList">
      {offers &&
        offers.map((offer) => (
          <OfferComponent key={offer.offer_id} offer={offer} />
        ))}
    </div>
  );
}
