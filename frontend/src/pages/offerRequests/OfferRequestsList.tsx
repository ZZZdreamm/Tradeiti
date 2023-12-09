import { Loader } from "../../common/loader/Loader";
import { OfferRequest } from "../../components/offerRequest/OfferRequest";
import { OfferDto } from "../../models/Offer";

interface Props {
  offerRequests: OfferDto[] | undefined;
}

export function OfferRequestsList({ offerRequests }: Props) {
  return (
    <>
      {offerRequests ? (
        <div className="requestList">
          {offerRequests.map((offerRequest) => (
            <OfferRequest
              key={offerRequest.offer_id}
              offerRequest={offerRequest}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
