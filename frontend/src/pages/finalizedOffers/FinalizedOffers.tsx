import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./style.scss";
import { getOffers } from "../../apiFunctions/getOffers";
import { OfferStatus } from "../../models/enums/OfferStatus";
import { Loader } from "../../common/loader/Loader";

function FinalizedOffers() {
  const { data: finalizedOffers } = useQuery(["offers", "finalized"], () =>
    getOffers(OfferStatus.COMPLETED)
  );
  return (
    <section>
      {finalizedOffers ? (
        finalizedOffers.map((offer) => offer.my_course.course_name)
      ) : (
        <Loader />
      )}
    </section>
  );
}

export const PrivateFinalizedOffers = withPrivateRoute(FinalizedOffers);
