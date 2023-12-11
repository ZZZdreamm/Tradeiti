import { useEffect } from "react";
import "./CourseDate.scss";
import { useFormContext } from "react-hook-form";
import { GroupDto } from "../../models/GroupDto";

interface CourseDateProps {
  date: GroupDto;
  handleChooseDate?: (date: GroupDto | null, hourType: string) => void;
  hourType?: string;
}

document.addEventListener('DOMContentLoaded', function() {

});

export function CourseDateComponent({
  date,
  handleChooseDate = () => {},
  hourType = "",
}: CourseDateProps) {
  const { watch } = useFormContext();
  const choosenHour: GroupDto = watch(hourType);

  const getAllElementsByClassName = (className: string) => {
    return document.querySelectorAll(`.${className}`);
  };

  const handleChange = () => {
    handleChooseDate(date, hourType);
  };

  const disableMyHour = () => {
    const myHourID = document.querySelectorAll('.myHour')[0].id;
    const indexOfMyHour = myHourID.indexOf("myHour");
    const endOfId = myHourID.slice(indexOfMyHour + "myHour".length + 1);
    const exclude = document.getElementById(`radioSpan/opponentHour/${endOfId}`);
    exclude?.classList.add("unavailable");
  }

  const handleSpanClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if(event.currentTarget.classList.contains("unavailable")){
      return;
    }const radioInput = event.currentTarget.querySelector('input[type="radio"]');
    if (radioInput) {
      (radioInput as HTMLElement).click();
      const spans = getAllElementsByClassName("opponentHour");
      for(let i = 0; i < spans.length; i++){
        (spans[i] as HTMLElement).style.borderRadius = "0px";
      }
      event.currentTarget.style.borderRadius = "15px";
      handleChooseDate(date, hourType);
    }
  };

  useEffect(() => {
    disableMyHour(); // Call disableMyHour after the component is rendered
  }, []);

  useEffect(() => {
    const span = document.getElementById(
      `radioSpan/${hourType}/${date.weekday}/${date.start_time}/${date.lecturers}`
    ) as HTMLSpanElement;
    const input = span.querySelector('input[type="radio"]') as HTMLInputElement;
    if (input.checked) return;
    if (
      choosenHour &&
      choosenHour.weekday == date.weekday &&
      choosenHour.start_time == date.start_time &&
      choosenHour.end_time == date.end_time &&
      choosenHour.class_type_name == date.class_type_name &&
      choosenHour.group_number == date.group_number
    ) {
      span.click();
    }
  }, [choosenHour]);


  return (
    <span
      id={`radioSpan/${hourType}/${date.weekday}/${date.start_time}/${date.lecturers}`}
      className={`radioSpan ${hourType}`}
      onClick={handleSpanClick}
    >
      <div className="radioSpan-date">
        <input type="radio" name={`hours/${hourType}`} onClick={handleChange} />{" "}
        <div className = "courseTime">
          {date.weekday} <b>
            <br />
            {date.start_time} - {date.end_time}</b>
        </div>
      </div>
      <div className="lecturers">
        {date.lecturers &&
          date.lecturers.map((lecturer, index) => (
            <span key={index}>{lecturer}</span>
          ))}
      </div>
    </span>
  );
}
