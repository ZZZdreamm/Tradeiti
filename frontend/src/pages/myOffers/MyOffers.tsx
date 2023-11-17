import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { ElementsContainer } from "../../components/elementsContainer/ElementsContainer";
import { MyOffersList } from "../../components/offer/MyOffersList";
import { mockedMyOffers } from "../../mocks/MockedMyOffers";
import "./MyOffers.scss";

const MyOffers = () => {
  return (
    <div>
      <button className = 'offerButton'>Dodaj ofertę <b>+</b></button>
      <button className = 'offerButton'>Usuń ofertę <b>-</b></button>
      <ElementsContainer>
      <MyOffersList offers={mockedMyOffers} />
    </ElementsContainer>
    </div>
  );
};

export const PrivateMyOffers = withPrivateRoute(MyOffers);
