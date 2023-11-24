import { useSearchParams } from "react-router-dom";
import { ElementsContainer } from "../../components/elementsContainer/ElementsContainer";
import { MyOffersList } from "../../components/offer/MyOffersList";
import { mockedMyOffers } from "../../mocks/MockedMyOffers";
import { MyOffersSteps } from "./MyOffersSteps";

export function ShowOffers() {
  const [_, setSearchParams] = useSearchParams();

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
      {/* <button className="offerButton">
        Usuń ofertę <b>-</b>
      </button> */}
      <ElementsContainer>
        <MyOffersList offers={mockedMyOffers} />
      </ElementsContainer>
    </>
  );
}
