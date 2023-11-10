import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

const MyOffers = () => {
  return (
    <div>
      <h1>MyOffers</h1>
    </div>
  );
};

export const PrivateMyOffers = withPrivateRoute(MyOffers);
