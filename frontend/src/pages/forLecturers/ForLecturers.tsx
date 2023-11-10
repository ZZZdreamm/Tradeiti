import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

const ForLecturers = () => {
  return (
    <div>
      <h1>Dla wykładowcy</h1>
      <br />
    </div>
  );
};

export const PrivateForLecturers = withPrivateRoute(ForLecturers);
