import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./style.scss";
import { Loader } from "../../common/loader/Loader";
import { FinalizedOffer } from "../../components/finalizedOffer/FinalizedOffer";
import { useSearchParams } from "react-router-dom";
import { OfferComments } from "../../components/offerComments/OfferComments";
import { useFetchFinalizedOffers } from "../../hooks/useFetchFinalizedOffers";

function FinalizedOffers() {
  const [searchParams] = useSearchParams();
  const offerId = searchParams.get("offer_id");
  const { finalizedOffers } = useFetchFinalizedOffers();

  return (
    <section>
      {!offerId ? (
        <>
          {finalizedOffers ? (
            <>
            {finalizedOffers.length > 0 ? (
              finalizedOffers.map((offer) => <FinalizedOffer offer={offer} />)) :
              <h6 className="noRequestsCom">
              Brak ofert będących w trakcie procesu wymiany
              </h6>
            }
            </>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <OfferComments offerId={offerId} />
      )}
    </section>
  );
}

export const PrivateFinalizedOffers = withPrivateRoute(FinalizedOffers);
