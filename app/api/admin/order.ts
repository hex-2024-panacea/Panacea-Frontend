import fetchData from '@/util/request';
import type { ResponseBody } from '@/types/request';
import type { UserListType } from '@/types/admin';

// 取得訂單列表
export const getOrderList = async (): Promise<ResponseBody<UserListType>> => {
  return fetchData({
    url: 'api/admin/order/list',
    method: 'GET',
  });
};
