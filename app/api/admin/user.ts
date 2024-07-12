import fetchData from '@/util/request';
import type { ResponseBody } from '@/types/request';
import type { UserListType } from '@/types/admin';
export const getUserList = async (): Promise<ResponseBody<UserListType>> => {
  return fetchData({
    url: 'api/admin/user/list',
    method: 'GET',
  });
};

export const editUser = async (id: string, body: UserListType) => {
  return fetchData({
    url: `api/admin/user/${id}`,
    data: body,
    method: 'PUT',
  });
};
