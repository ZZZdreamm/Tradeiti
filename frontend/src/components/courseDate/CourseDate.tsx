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

  const getAllElementsByClassName = (className) => {
    return document.querySelectorAll(`.${className}`);
  };

  const handleChange = () => {
    handleChooseDate(date, hourType);
  };

  const handleSpanClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const radioInput = event.currentTarget.querySelector('input[type="radio"]');
    const spans = getAllElementsByClassName(event.currentTarget.classList[1]);
    if (radioInput) {
      radioInput.click(); // Trigger a click on the radio input
      for(let i = 0; i < spans.length; i++){
        spans[i].style.borderRadius = '0px';
      }
      event.currentTarget.style.borderRadius = '15px';
      handleChooseDate(date, hourType); // Call your custom handler if needed
    }
  };

  return (
    <span className={`radioSpan ${hourType}`}  onClick={handleSpanClick}>
      <input type="radio" name={`hours/${hourType}`} onClick={handleChange} />{" "}
      {date.course_day} - {date.course_time}
    </span>
  );
}
