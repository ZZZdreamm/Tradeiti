import { useQuery } from "react-query";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { CoursesList } from "../../components/coursesList/CoursesList";
import "./style.scss";
import { getAllCourses } from "../../apiFunctions/getAllCourses";

function Courses() {
  const { data: courses } = useQuery("courses", getAllCourses);
  return (
    <section>
      <div className="coursesBox">
        <CoursesList courses={courses} />
      </div>
    </section>
  );
}

export const PrivateCourses = withPrivateRoute(Courses);
