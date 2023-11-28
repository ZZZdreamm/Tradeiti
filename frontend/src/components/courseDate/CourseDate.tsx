import { CourseDate } from "../../models/CourseDate";
import "./CourseDate.scss"
  // import {useState} from 'react'

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
    if(event.currentTarget && event.currentTarget.classList.contains('unavailable')){
      return;
    }
    const radioInput = event.currentTarget.querySelector('input[type="radio"]');
    const spans = getAllElementsByClassName(event.currentTarget.classList[1]);
    if (radioInput) {
      (radioInput as HTMLElement).click();
      for(let i = 0; i < spans.length; i++){
        (spans[i] as HTMLElement).style.borderRadius = '0px';
        if(spans[i] == event.currentTarget && event.currentTarget.classList.contains('myHour')){
          const oppSpans = getAllElementsByClassName('opponentHour');
          for(let o = 0; o < oppSpans.length; o++){
            if((oppSpans[o] as HTMLElement).classList.contains('unavailable')){
              (oppSpans[o] as HTMLElement).classList.remove('unavailable');
              (oppSpans[o].firstChild as HTMLInputElement).disabled = false;
            }
          }
          (oppSpans[i] as HTMLElement).classList.add('unavailable');
          (oppSpans[i] as HTMLElement).style.borderRadius = '0px';
          (oppSpans[i].firstChild as HTMLInputElement).disabled = true;
          (oppSpans[i].firstChild as HTMLInputElement).checked = false;
        }
      }
      event.currentTarget.style.borderRadius = '15px';
      handleChooseDate(date, hourType);
    }
  };

  return (
    <span className={`radioSpan ${hourType}`}  onClick={handleSpanClick}>
      <input type="radio" name={`hours/${hourType}`} onClick={handleChange} />{" "}
      {date.course_day} - {date.course_time}
    </span>
  );
}
