import { Loader } from "../../common/loader/Loader";
import { OfferDto } from "../../models/Offer";
import { MyOfferComponent } from "./MyOffer";

interface Props {
  offers: OfferDto[] | undefined;
}

export function MyOffersList({ offers }: Props) {
  return (
    <div className="myOffersList">
      {offers ? (
        offers.map((offer) => (
          <MyOfferComponent key={offer.offer_id} offer={offer} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
