import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./style.scss";
import { getOffers } from "../../apiFunctions/getOffers";
import { OfferStatus } from "../../models/enums/OfferStatus";
import { Loader } from "../../common/loader/Loader";
import { FinalizedOffer } from "../../components/finalizedOffer/FinalizedOffer";
import { useSearchParams } from "react-router-dom";
import { OfferComments } from "../../components/offerComments/OfferComments";

function FinalizedOffers() {
  const [searchParams] = useSearchParams();
  const offerId = searchParams.get("offer_id");
  const { data: finalizedOffers } = useQuery(["offers", "finalized"], () =>
    getOffers(OfferStatus.COMPLETED)
  );

  return (
    <section>
      {!offerId ? (
        <>
          {finalizedOffers ? (
            finalizedOffers.map((offer) => <FinalizedOffer offer={offer} />)
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
