import fetchData from '@/util/request';
import { ResponseBody } from '@/types/request';
import { CourseList, CourseListParams, CourseDetails, CourseSchedule } from '@/types/courses';

export const getCourseList = async (params: CourseListParams): Promise<ResponseBody<CourseList[]>> => {
  return fetchData({
    url: 'api/course',
    method: 'GET',
    params,
  });
};

export const getCourseDetails = async (id: string): Promise<ResponseBody<CourseDetails>> => {
  return fetchData({
    url: `api/course/${id}/details`,
    method: 'GET',
  });
};

export const getCoachCourseTime = async (
  coachId: string,
  courseId: string,
): Promise<ResponseBody<CourseSchedule[]>> => {
  return fetchData({
    url: `api/coach/${coachId}/course/${courseId}/schedule`,
    method: 'GET',
  });
};
