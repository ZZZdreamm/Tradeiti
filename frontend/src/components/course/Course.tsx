import { Course } from "../../models/Course";

interface Props {
  course: Course;
}

export function CourseComponent({ course }: Props) {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
}
