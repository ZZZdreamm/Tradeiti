import { useQuery } from "react-query";
import { getAllCourses } from "../../apiFunctions/getAllCourses";
import { CoursesList } from "../../components/coursesList/CoursesList";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

function Courses() {
  const { data: courses } = useQuery("courses", getAllCourses);
  return (
    <div>
      <CoursesList courses={courses} inOffers={false} />
    </div>
  );
}

export const PrivateCourses = withPrivateRoute(Courses);
