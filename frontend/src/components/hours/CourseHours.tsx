import { Loader } from "../../common/loader/Loader";
import { CourseDateData } from "../../models/CourseDate";
import { CourseDateComponent } from "../courseDate/CourseDate";
import "./CourseHours.scss";

interface Props {
  dates: CourseDateData[];
  handleChooseDate?: (date: CourseDateData | null, hourType: string) => void;
  hourType?: string;
}

export function CourseHours({
  dates,
  handleChooseDate = () => {},
  hourType,
}: Props) {
  return (
    <>
      {dates ? (
        dates.map((date, index) => (
          <CourseDateComponent
            key={index}
            date={date}
            handleChooseDate={handleChooseDate}
            hourType={hourType}
          />
        ))
      ) : (
        <Loader />
      )}
    </>
  );
}
