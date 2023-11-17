import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

const HelpPage = () => {
  return (
    <div>
      <h1>Pomoc</h1>
      <br />
    </div>
  );
};

export const PrivateHelpPage = withPrivateRoute(HelpPage);
