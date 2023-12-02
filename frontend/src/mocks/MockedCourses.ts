import { CourseDto } from "../models/Course";

export const mockedCourses: CourseDto[] = [
    {
      course_id: "CS101",
      course_name: "Introduction to Computer Science",
      groups: [
        {
          group_number: 1,
          class_type_name: "Lecture",
          start_time: "9:00 AM",
          end_time: "10:30 AM",
          weekday: "Monday",
          lecturers: ["Dr. Smith"],
        },
        {
          group_number: 2,
          class_type_name: "Lab",
          start_time: "2:00 PM",
          end_time: "4:00 PM",
          weekday: "Wednesday",
          lecturers: ["Prof. Johnson"],
        },
      ],
    },
    {
      course_id: "ENG201",
      course_name: "English Composition",
      groups: [
        {
          group_number: 1,
          class_type_name: "Lecture",
          start_time: "11:00 AM",
          end_time: "12:30 PM",
          weekday: "Tuesday",
          lecturers: ["Dr. Anderson"],
        },
      ],
    },
    {
      course_id: "MATH301",
      course_name: "Advanced Mathematics",
      groups: [
        {
          group_number: 1,
          class_type_name: "Lecture",
          start_time: "1:00 PM",
          end_time: "2:30 PM",
          weekday: "Thursday",
          lecturers: ["Prof. Davis"],
        },
        {
          group_number: 2,
          class_type_name: "Discussion",
          start_time: "3:00 PM",
          end_time: "4:30 PM",
          weekday: "Friday",
          lecturers: ["Dr. Martinez"],
        },
      ],
    },
    // Add more mocked courses as needed
  ];