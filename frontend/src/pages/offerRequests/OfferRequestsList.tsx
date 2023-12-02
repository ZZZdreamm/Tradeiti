import { Loader } from "../../common/loader/Loader";
import { OfferRequest } from "../../components/offerRequest/OfferRequest";
import { Offer } from "../../models/Offer";

interface Props {
  offerRequests: Offer[] | undefined;
}

export function OfferRequestsList({ offerRequests }: Props) {
  return (
    <div className="requestList">
      {offerRequests ? (
        offerRequests.map((offerRequest) => (
          <OfferRequest
            key={offerRequest.offer_id}
            offerRequest={offerRequest}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
