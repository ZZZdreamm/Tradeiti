import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

const ForLecturers = () => {
  return (
    <div>
      <h1>Dla wykładowcy</h1>
      <br />
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/PjZi1zlxXRA`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export const PrivateForLecturers = withPrivateRoute(ForLecturers);
