import { Loader } from "../../common/loader/Loader";
import { Offer } from "../../models/Offer";
import { OfferComponent } from "./Offer";

interface Props {
  offers?: Offer[] | undefined;
}

export function OffersList({ offers }: Props) {
  return (
    <div className="offersList">
      {offers ? (
        offers.map((offer) => (
          <OfferComponent key={offer.offer_id} offer={offer} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
