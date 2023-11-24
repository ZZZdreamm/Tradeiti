import { CourseDate } from "../../models/CourseDate";

interface CourseDateProps {
  date: CourseDate;
  handleChooseDate?: (date: CourseDate, hourType: string) => void;
  hourType?: string;
}

export function CourseDateComponent({
  date,
  handleChooseDate = () => {},
  hourType = "",
}: CourseDateProps) {
  return (
    <span>
      <input type="checkbox" onClick={() => handleChooseDate(date, hourType)} />{" "}
      {date.course_day} - {date.course_time}
    </span>
  );
}
