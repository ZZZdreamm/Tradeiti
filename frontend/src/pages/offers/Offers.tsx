import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { OffersList } from "../../components/offer/OffersList";
import { SearchTable } from "../../components/searchTable/SearchTable";
import "./style.scss";
import { getOffers } from "../../apiFunctions/getOffers";
import { searchOffers } from "../../apiFunctions/searchOffers";
import { useState } from "react";

const searchTableInputsLabels = [
  { label: "Offer ID", input: "offer_id" },
  { label: "Course name", input: "course_name" },
  { label: "Lecturer", input: "lecturer" },
  { label: "Start time", input: "start_time" },
];

const Offers = () => {
  const { data: offers } = useQuery("offers", getOffers);
  const [searchedOffers, setSearchedOffers] = useState([]);

  const handleSearch = async (values: any) => {
    const { data } = await searchOffers(values);
    setSearchedOffers(data);
  };

  return (
    <div className="offers">
      <SearchTable
        inputsLabels={searchTableInputsLabels}
        handleOnSubmit={handleSearch}
      />
      <OffersList
        offers={searchedOffers.length > 0 ? searchedOffers : offers?.data}
      />
    </div>
  );
};

export const PrivateOffers = withPrivateRoute(Offers);
