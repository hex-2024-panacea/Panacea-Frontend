import fetchData from '../../util/request';

interface ResponesBody {
  code: number;
  data: object[];
  message: string;
  meta: object;
}

interface CourseListParams {
  page: number;
  courseName?: string;
  category?: string;
}

export const getCourseList = async (params: CourseListParams): Promise<ResponesBody> => {
  return fetchData({
    url: 'api/course',
    method: 'GET',
    params,
  });
};
