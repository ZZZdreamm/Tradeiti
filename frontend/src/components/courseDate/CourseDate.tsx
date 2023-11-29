import { CourseDate } from "../../models/CourseDate";
import "./CourseDate.scss";

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
            const oppenentSpan = oppSpans[o] as HTMLElement;
            const spanFirstChild = oppenentSpan.firstChild as HTMLInputElement;
            if (oppenentSpan.classList.contains("unavailable")) {
              oppenentSpan.classList.remove("unavailable");
              spanFirstChild.disabled = false;
            }
          }
          const op2Span = oppSpans[i] as HTMLElement;
          const op2SpanFirstChild = op2Span.firstChild as HTMLInputElement;
          op2Span.classList.add("unavailable");
          op2Span.style.borderRadius = "0px";
          op2SpanFirstChild.disabled = true;
          op2SpanFirstChild.checked = false;
        }
      }
      event.currentTarget.style.borderRadius = "15px";
      handleChooseDate(date, hourType);
    }
  };

  return (
    <span className={`radioSpan ${hourType}`} onClick={handleSpanClick}>
      <input type="radio" name={`hours/${hourType}`} onClick={handleChange} />{" "}
      {date.course_day} - {date.course_time}
    </span>
  );
}
