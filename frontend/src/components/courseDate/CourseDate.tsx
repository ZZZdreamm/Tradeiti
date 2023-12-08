import { useEffect } from "react";
import { CourseDateData } from "../../models/CourseDate";
import "./CourseDate.scss";
import { useFormContext } from "react-hook-form";

interface CourseDateProps {
  date: CourseDateData;
  handleChooseDate?: (date: CourseDateData | null, hourType: string) => void;
  hourType?: string;
}

export function CourseDateComponent({
  date,
  handleChooseDate = () => {},
  hourType = "",
}: CourseDateProps) {
  const { watch } = useFormContext();
  const choosenHour: CourseDateData = watch(hourType);

  const getAllElementsByClassName = (className: string) => {
    return document.querySelectorAll(`.${className}`);
  };

  const handleChange = () => {
    handleChooseDate(date, hourType);
  };

  const handleSpanClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (
      event.currentTarget &&
      event.currentTarget.classList.contains("unavailable")
    ) {
      return;
    }
    const radioInput = event.currentTarget.querySelector('input[type="radio"]');
    const spans = getAllElementsByClassName(event.currentTarget.classList[1]);
    if (radioInput) {
      (radioInput as HTMLElement).click(); // Trigger a click on the radio input
      for (let i = 0; i < spans.length; i++) {
        (spans[i] as HTMLElement).style.borderRadius = "0px";
        if (
          spans[i] == event.currentTarget &&
          event.currentTarget.classList.contains("myHour")
        ) {
          const oppSpans = getAllElementsByClassName("opponentHour");
          for (let o = 0; o < oppSpans.length; o++) {
            const opponentSpan = oppSpans[o] as HTMLElement;
            const radioSpan =
              opponentSpan.querySelectorAll(`.radioSpan-date`)[0];
            const spanInput = radioSpan.firstChild as HTMLInputElement;
            if (opponentSpan.classList.contains("unavailable")) {
              opponentSpan.classList.remove("unavailable");
              spanInput.disabled = false;
            }
          }
          const op2Span = oppSpans[i] as HTMLElement;
          const op2RadioSpan = op2Span.querySelectorAll(`.radioSpan-date`)[0];
          const op2Input = op2RadioSpan.firstChild as HTMLInputElement;
          op2Span.classList.add("unavailable");
          op2Span.style.borderRadius = "0px";
          if (op2Input.checked) {
            op2Input.checked = false;
            handleChooseDate(null, "opponentHour");
          }
          op2Input.disabled = true;
        }
      }
      event.currentTarget.style.borderRadius = "15px";
      handleChooseDate(date, hourType);
    }
  };

  useEffect(() => {
    if (
      choosenHour &&
      choosenHour.weekday === date.weekday &&
      choosenHour.start_time === date.start_time &&
      choosenHour.lecturers === date.lecturers
    ) {
      const span = document.getElementById(
        `radioSpan/${hourType}/${date.weekday}/${date.start_time}`
      ) as HTMLElement;
      span.click();
    }
  }, []);

  return (
    <span
      id={`radioSpan/${hourType}/${date.weekday}/${date.start_time}`}
      className={`radioSpan ${hourType}`}
      onClick={handleSpanClick}
    >
      <div className="radioSpan-date">
        <input type="radio" name={`hours/${hourType}`} onClick={handleChange} />{" "}
        <div>
          {date.weekday} {date.start_time} - {date.end_time}
        </div>
      </div>
      <div>
        {date.lecturers &&
          date.lecturers.map((lecturer) => <span>{lecturer}</span>)}
      </div>
    </span>
  );
  
}
