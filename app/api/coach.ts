import fetchData from '@/util/request';
import { ResponesBody } from '@/types/request';
import { CourseList } from '@/types/courses';

export const getCoachCourse = async (): Promise<ResponesBody<CourseList[]>> => {
  return fetchData({
    url: 'api/coach/booking-course',
    method: 'GET',
  });
};
