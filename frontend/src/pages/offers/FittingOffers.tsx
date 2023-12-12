import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { OffersList } from "../../components/offer/OffersList";
import { SearchTable } from "../../components/searchTable/SearchTable";
import "./style.scss";
import { getFittingOffers } from "../../apiFunctions/getOffers";
import { useState } from "react";
import { OfferDto } from "../../models/Offer";
import { filterOffers } from "./filterOffers";
import { SearchOfferOptions } from "../../models/SearchOfferOptions";
import {
  extractDatesFromOffers,
  extractLecturersFromOffers,
  extractSimpleValuesFromOffers,
} from "./extractValuesFromOffers";
import { OfferStatus } from "../../models/enums/OfferStatus";
import { useNavigate } from "react-router-dom";

const FittingOffers = () => {
  const { data: allOffers } = useQuery(["offers", "pending"], () =>
    getFittingOffers(OfferStatus.PENDING)
  );

  const [searchedOffers, setSearchedOffers] = useState<OfferDto[] | undefined>(
    undefined
  );
  const searchTableInputsLabels = [
    {
      label: "ID",
      input: "course_id",
      values: extractSimpleValuesFromOffers("course_id", allOffers ?? []),
    },
    {
      label: "Zajęcia",
      input: "course_name",
      values: extractSimpleValuesFromOffers("course_name", allOffers ?? []),
    },
    {
      label: "Prowadzący",
      input: "lecturer",
      values: extractLecturersFromOffers(allOffers ?? []),
    },
    {
      label: "Termin",
      input: "date",
      values: extractDatesFromOffers(allOffers ?? []),
    },
  ];


  const navigate = useNavigate();

  const handleSearch = async (searchValues: SearchOfferOptions) => {
    const offers = filterOffers(searchValues, allOffers ?? []);
    setSearchedOffers(offers);
  };

  const handleReset = () => {
    setSearchedOffers(undefined);
  };

  return (
    <>
    <div className="offersPot">
      <div className="pot" onClick={() => navigate("/offers")}>WSZYSTKIE OFERTY</div>
      <div className="pot" onClick={() => navigate("/fittingOffers")}>OFERTY DLA MNIE</div>
    </div>
    <div className="offers"></div>
    <div className="offers">
      <SearchTable
        inputsLabels={searchTableInputsLabels}
        handleOnSubmit={handleSearch}
        handleOnReset={handleReset}
      />
      <OffersList offers={searchedOffers ? searchedOffers : allOffers} />
    </div>
    </>
  );
};

export const PrivateFittingOffers = withPrivateRoute(FittingOffers);
