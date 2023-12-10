import { OfferDto } from '../models/Offer';
import { CourseDto } from '../models/Course';
import { OfferStatus } from '../models/enums/OfferStatus';

// Mocked course data with additional groups
const mockedCourse: CourseDto = {
  course_id: '123',
  course_name: 'Computer Science',
  groups: [
    {
      group_number: 1,
      class_type_name: 'Lecture',
      start_time: '09:00 AM',
      end_time: '10:30 AM',
      weekday: 'Monday',
      lecturers: ['Dr. Smith', 'Professor Kruk'],
    },
    {
      group_number: 2,
      class_type_name: 'Lab',
      start_time: '02:00 PM',
      end_time: '04:30 PM',
      weekday: 'Wednesday',
      lecturers: ['Prof. Johnson'],
    },
    // Add more groups if needed
  ],
};

const mockedCourseToo: CourseDto = {
  course_id: '123',
  course_name: 'Computer Science',
  groups: [
    {
      group_number: 2,
      class_type_name: 'Lab',
      start_time: '02:00 PM',
      end_time: '04:30 PM',
      weekday: 'Wednesday',
      lecturers: ['Prof. Johnson'],
    },
    // Add more groups if needed
  ],
};

// Additional mocked offers with different details
export const mockedOffers: OfferDto[] = [
  {
    offer_id: '1',
    owner_username: 'user1',
    receiver_username: 'user2',
    state: OfferStatus.PENDING,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '2',
    owner_username: 'user3',
    receiver_username: 'user4',
    state: OfferStatus.REQUEST_SENT,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '3',
    owner_username: 'user5',
    receiver_username: 'user6',
    state: OfferStatus.COMPLETED,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '4',
    owner_username: 'user7',
    receiver_username: 'user8',
    state: OfferStatus.PENDING,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '5',
    owner_username: 'user9',
    receiver_username: 'user10',
    state: OfferStatus.REQUEST_SENT,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '6',
    owner_username: 'user11',
    receiver_username: 'user12',
    state: OfferStatus.COMPLETED,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },

];

// export const mockedOffers: OfferDto[] = [];

export const finishedOffers: OfferDto[] = [
  {
    offer_id: '1',
    owner_username: 'user1',
    receiver_username: 'user2',
    state: OfferStatus.PENDING,
    my_course: mockedCourse,
    wanted_course: mockedCourseToo,
  },
  {
    offer_id: '2',
    owner_username: 'user3',
    receiver_username: 'user4',
    state: OfferStatus.REQUEST_SENT,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '3',
    owner_username: 'user5',
    receiver_username: 'user6',
    state: OfferStatus.COMPLETED,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '4',
    owner_username: 'user7',
    receiver_username: 'user8',
    state: OfferStatus.PENDING,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '5',
    owner_username: 'user9',
    receiver_username: 'user10',
    state: OfferStatus.REQUEST_SENT,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },
  {
    offer_id: '6',
    owner_username: 'user11',
    receiver_username: 'user12',
    state: OfferStatus.COMPLETED,
    my_course: mockedCourse,
    wanted_course: mockedCourse,
  },

];
