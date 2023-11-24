import { CourseDate } from "../../models/CourseDate";
import { CourseDateComponent } from "../courseDate/CourseDate";

interface Props {
  dates: CourseDate[];
  handleChooseDate?: (date: CourseDate, hourType: string) => void;
  hourType?: string;
}

export function CourseHours({
  dates,
  handleChooseDate = () => {},
  hourType,
}: Props) {
  return (
    <>
      {dates &&
        dates.map((date, index) => (
          <CourseDateComponent
            key={index}
            date={date}
            handleChooseDate={handleChooseDate}
            hourType={hourType}
          />
        ))}
    </>
  );
}
