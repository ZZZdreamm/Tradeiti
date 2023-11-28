import { useSearchParams } from "react-router-dom";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./MyOffers.scss";
import { ShowOffers } from "./ShowOffers";
import { MyOffersSteps } from "./MyOffersSteps";
import { AddOffer } from "./AddOffer";
import { EditOffer } from "./EditOffer";

const MyOffers = () => {
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get("page");
  const stage = searchParams.get("stage");
  return (
    <>
      {!page && <ShowOffers />}
      {page && <>
      <div className="stageDiv">
        <div className={`addStage ${stage == '1' ? 'currentStage' : ''}`}>1. Wybór przedmiotu</div>
        <div className={`addStage ${stage == '2' ? 'currentStage' : ''}`}>2. Wybór godziny</div>
        <div className={`addStage ${stage == '3' ? 'currentStage' : ''}`}>3. Finalizacja</div>
      </div>
      <hr />
      <br />
      </>
      }
      {page == MyOffersSteps.MY_OFFERS_ADD && <AddOffer />}
      {page == MyOffersSteps.MY_OFFERS_EDIT && <EditOffer />}
    </>
  );
};

export const PrivateMyOffers = withPrivateRoute(MyOffers);
