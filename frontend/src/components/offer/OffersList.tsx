import { Loader } from "../../common/loader/Loader";
import { OfferDto } from "../../models/Offer";
import { OfferComponent } from "./Offer";

interface Props {
  offers?: OfferDto[] | undefined;
}

export function OffersList({ offers }: Props) {
  return (
    <>
      {offers ? (
        <div className="offersList">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <OfferComponent key={offer.offer_id} offer={offer} />
            ))
          ) : (
            <h5 className="noOffersCom">Brak ofert pasujących do Twoich kryteriów</h5>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
