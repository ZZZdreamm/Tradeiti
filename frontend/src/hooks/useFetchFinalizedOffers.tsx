import { useQuery } from "react-query";
import { useAuthContext } from "../providers/AuthProvider";
import { getOffersAndOfferRequests } from "../apiFunctions/getOffersAndOfferRequests";
import { OfferStatus } from "../models/enums/OfferStatus";


// Hook for fetching finalized offers and offer requests
// Returns finalized offers
export function useFetchFinalizedOffers() {
  const { currentUser } = useAuthContext();
  const { data: finalizedOffers } = useQuery(["offers", "finalized"], () =>
    getOffersAndOfferRequests(OfferStatus.COMPLETED)
  );

  finalizedOffers?.forEach((offer) => {
    if (currentUser?.username != offer.owner_username) {
      let temp = offer.my_course;
      offer.my_course = offer.wanted_course;
      offer.wanted_course = temp;
    }
  });

  return { finalizedOffers };
}
