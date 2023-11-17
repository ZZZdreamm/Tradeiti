import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { CourseComponent } from "../../components/course/Course";
import { MockedCourses } from "../../mocks/MockedCourses";
import "./style.scss";

function Courses() {
  return (
    <section>
      <div className="coursesBox">
      {MockedCourses &&
        MockedCourses.map((course, index) => (
          <CourseComponent key={index} course={course} />
        ))}
      </div>
    </section>
  );
}

export const PrivateCourses = withPrivateRoute(Courses);
