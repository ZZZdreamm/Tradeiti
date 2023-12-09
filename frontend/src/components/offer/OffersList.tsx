import { Loader } from "../../common/loader/Loader";
import { OfferDto } from "../../models/Offer";
import { OfferComponent } from "./Offer";

interface Props {
  offers?: OfferDto[] | undefined;
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
