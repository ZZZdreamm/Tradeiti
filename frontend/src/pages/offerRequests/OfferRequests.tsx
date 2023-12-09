import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./OfferRequests.scss";
import { OfferRequestsList } from "./OfferRequestsList";
import { OfferStatus } from "../../models/OfferStatus";
import { getOffers } from "../../apiFunctions/getOffers";

function OfferRequests() {
  const { data: offerRequests } = useQuery(["offers", "requested"], () =>
    getOffers(OfferStatus.REQUEST_SENT)
  );
  return (
    <div>
      <OfferRequestsList offerRequests={offerRequests} />
    </div>
  );
}

export const PrivateOfferRequests = withPrivateRoute(OfferRequests);
