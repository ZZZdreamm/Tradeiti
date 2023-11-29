import { useSearchParams } from "react-router-dom";
import { ElementsContainer } from "../../components/elementsContainer/ElementsContainer";
import { MyOffersList } from "../../components/offer/MyOffersList";
import { MyOffersSteps } from "./MyOffersSteps";
import { useQuery } from "react-query";
import { getUserOffers } from "../../apiFunctions/getUserOffers";

export function ShowOffers() {
  const [_, setSearchParams] = useSearchParams();
  const { data: offers } = useQuery("userOffers", getUserOffers);

  const handleAddOffer = () => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      stage: `1`,
    });
  };
  return (
    <>
      <button className="offerButton" onClick={handleAddOffer}>
        Dodaj ofertę <b>+</b>
      </button>
      <ElementsContainer>
        <MyOffersList offers={offers} />
      </ElementsContainer>
    </>
  );
}
