import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { ElementsContainer } from "../../components/elementsContainer/ElementsContainer";
import { OffersList } from "../../components/offer/OffersList";
import { mockedOffers } from "../../mocks/MockedOffers";

const Offers = () => {
  return (
    <ElementsContainer>
      <OffersList offers={mockedOffers} />
    </ElementsContainer>
  );
};

export const PrivateOffers = withPrivateRoute(Offers);
