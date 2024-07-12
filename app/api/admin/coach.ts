import fetchData from '@/util/request';
import type { ResponseBody } from '@/types/request';
import type { UserListType } from '@/types/admin';

// 取得教練列表
export const getCoachList = async (): Promise<ResponseBody<UserListType>> => {
  return fetchData({
    url: 'api/admin/coach/list',
    method: 'GET',
  });
};

// 編輯教練
export const editCoach = async (id: string, body: UserListType) => {
  return fetchData({
    url: `api/admin/coach/${id}`,
    data: body,
    method: 'PUT',
  });
};

// 教練審核
export const reviewCoach = async (id: string, body: { approvalStatus: string; reason?: string }) => {
  return fetchData({
    url: `api/admin/coach/review/${id}`,
    data: body,
    method: 'PUT',
  });
};
