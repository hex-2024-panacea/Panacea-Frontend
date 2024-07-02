import fetchData from '@/util/request';
import { ResponesBody } from '@/types/request';
import { CourseList, CourseListParams, CourseDetails } from '@/types/courses';

export const getCourseList = async (params: CourseListParams): Promise<ResponesBody<CourseList[]>> => {
  return fetchData({
    url: 'api/course',
    method: 'GET',
    params,
  });
};

export const getCourseDetails = async (id: string): Promise<ResponesBody<CourseDetails>> => {
  return fetchData({
    url: `api/course/${id}/details`,
    method: 'GET',
  });
};
