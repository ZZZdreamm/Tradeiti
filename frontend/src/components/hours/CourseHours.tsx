import { GroupDto } from "../../models/GroupDto";
import { CourseDateComponent } from "../courseDate/CourseDate";
import "./CourseHours.scss";

interface Props {
  dates: GroupDto[] | undefined;
  handleChooseDate?: (date: GroupDto | null, hourType: string) => void;
  hourType?: string;
}

export function CourseHours({
  dates,
  handleChooseDate = () => {},
  hourType,
}: Props) {
  return (
    <>
      {dates && (
        dates.map((date, index) => (
          <CourseDateComponent
            key={index}
            date={date}
            handleChooseDate={handleChooseDate}
            hourType={hourType}
          />
        ))
      )}
    </>
  );
}
