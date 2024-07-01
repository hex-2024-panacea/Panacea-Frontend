import fetchData from '../../util/request';

interface CourseList {
  _id: string;
  name: string;
  coach: string;
  coverImage: string;
  description: string;
  category: [string];
  subCategory: [string];
  startDate: string;
  isActive: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface CourseListParams {
  page: number;
  courseName?: string;
  category?: string;
}

export const getCourseList = async (params: CourseListParams): Promise<CourseList> => {
  return fetchData({
    url: 'api/course',
    method: 'GET',
    params,
  });
};
