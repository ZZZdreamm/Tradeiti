import { GroupDto } from "./GroupDto";

export interface CourseDto {
  course_id: string;
  course_name: string;
  groups: GroupDto[];
}
