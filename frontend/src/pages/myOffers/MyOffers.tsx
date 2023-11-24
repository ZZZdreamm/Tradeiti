import { useSearchParams } from "react-router-dom";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./MyOffers.scss";
import { ShowOffers } from "./ShowOffers";
import { MyOffersSteps } from "./MyOffersSteps";
import { AddOffer } from "./AddOffer";
import { EditOffer } from "./EditOffer";

const MyOffers = () => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page");
  return (
    <>
      {!page && <ShowOffers />}
      {page == MyOffersSteps.MY_OFFERS_ADD && <AddOffer />}
      {page == MyOffersSteps.MY_OFFERS_EDIT && <EditOffer />}
    </>
  );
};

export const PrivateMyOffers = withPrivateRoute(MyOffers);
