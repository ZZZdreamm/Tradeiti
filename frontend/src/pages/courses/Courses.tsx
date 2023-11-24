import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { CoursesList } from "../../components/coursesList/CoursesList";
import { MockedCourses } from "../../mocks/MockedCourses";
import "./style.scss";

function Courses() {
  return (
    <section>
      <div className="coursesBox">
        <CoursesList courses={MockedCourses} />
      </div>
    </section>
  );
}

export const PrivateCourses = withPrivateRoute(Courses);
