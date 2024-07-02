import fetchData from '@/util/request';
import { ResponesBody } from '@/types/request';
import { CourseList, CourseListParams } from '@/types/courses';

export const getCourseList = async (params: CourseListParams): Promise<ResponesBody<CourseList[]>> => {
  return fetchData({
    url: 'api/course',
    method: 'GET',
    params,
  });
};
