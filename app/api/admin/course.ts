import fetchData from '@/util/request';
import type { ResponseBody } from '@/types/request';
import type { UserListType } from '@/types/admin';

// 取得課程列表
export const getCourseList = async (params?: {
  page?: string;
  category?: string;
  subCategory?: string;
  approvalStatus?: string;
}): Promise<ResponseBody<UserListType>> => {
  return fetchData({
    url: 'api/admin/course/list',
    params,
    method: 'GET',
  });
};

// 課程審核
export const reviewCourse = (id: string, data: { approvalStatus: string; reason?: string }) => {
  return fetchData({
    url: `api/admin/course/review/${id}`,
    data,
    method: 'PUT',
  });
};
