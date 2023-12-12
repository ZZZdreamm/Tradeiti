import { useEffect } from "react";
import { Loader } from "../../common/loader/Loader";
import { OfferDto } from "../../models/Offer";
import { OfferComponent } from "./Offer";
import { useLocation } from 'react-router-dom';

interface Props {
  offers?: OfferDto[] | undefined;
}

export function OffersList({ offers }: Props) {

  const location = useLocation();

  useEffect(() => {
    let potElement : HTMLElement;
    if (location.pathname === '/offers') {
      potElement = document.querySelectorAll('.pot')[0] as HTMLElement;
    } else {
      potElement = document.querySelectorAll('.pot')[1] as HTMLElement;
    }
    potElement.style.opacity = '0.7';

  }, [location.pathname]);

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
