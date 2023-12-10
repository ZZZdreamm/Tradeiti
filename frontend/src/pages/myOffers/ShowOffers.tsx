import { useSearchParams } from "react-router-dom";
import { MyOffersList } from "../../components/offer/MyOffersList";
import { MyOffersSteps } from "./MyOffersSteps";
import { useQuery } from "react-query";
import { getUserOffers } from "../../apiFunctions/getUserOffers";
import { OfferStatus } from "../../models/enums/OfferStatus";

export function ShowOffers() {
  const [_, setSearchParams] = useSearchParams();
  const { data: offers } = useQuery("userOffers", getUserOffers);

  const handleAddOffer = () => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      stage: `1`,
    });
  };

  const offersToShow = offers?.filter(
    (offer) => offer.state !== OfferStatus.COMPLETED
  );
  return (
    <>
      <button className="offerButton" onClick={handleAddOffer}>
        Dodaj ofertę <b>+</b>
      </button>
      <MyOffersList offers={offersToShow} />
    </>
  );
}
