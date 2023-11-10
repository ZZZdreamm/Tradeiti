import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { CourseComponent } from "../../components/course/Course";
import { MockedCourses } from "../../mocks/MockedCourses";

function Courses() {
  return (
    <section>
      {MockedCourses &&
        MockedCourses.map((course, index) => (
          <CourseComponent key={index} course={course} />
        ))}
    </section>
  );
}

export const PrivateCourses = withPrivateRoute(Courses);
