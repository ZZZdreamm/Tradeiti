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
          {offerRequests.length > 0 ? (
            offerRequests.map((offerRequest) => (
              <OfferRequest
                key={offerRequest.offer_id}
                offerRequest={offerRequest}
              />
            ))
          ) : (

              <h6 className="noRequestsCom">
                Brak ofert będących w trakcie procesu wymiany
              </h6>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
