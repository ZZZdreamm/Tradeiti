import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

const Offers = () => {
  return (
    <div>
      <h1>Offers</h1>
    </div>
  );
};

export const PrivateOffers = withPrivateRoute(Offers);
