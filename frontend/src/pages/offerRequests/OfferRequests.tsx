import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { getOfferRequests } from "../../apiFunctions/getOfferRequests";
import "./OfferRequests.scss";
import { OfferRequestsList } from "./OfferRequestsList";

function OfferRequests() {
  const { data: offerRequests } = useQuery("offerRequests", getOfferRequests);
  return (
    <div>
      <OfferRequestsList offerRequests={offerRequests} />
    </div>
  );
}

export const PrivateOfferRequests = withPrivateRoute(OfferRequests);
