import fetchData from '../../util/request';
import { ResponseBody } from '@/types/request';
import { UserInfo } from '@/types/user';

export const getUserInfo = async (): Promise<ResponseBody<UserInfo>> => {
  return fetchData({
    url: 'api/auth/user-info',
    method: 'GET',
  });
};

export const apiGetNotification = async (): Promise<ResponseBody<any>> => {
  return fetchData({
    url: 'api/notifications',
    method: 'GET',
  });
};
export const apiReadNotification = async (id: string): Promise<ResponseBody<any>> => {
  return fetchData({
    url: `api/notifications/${id}`,
    method: 'POST',
  });
};

export const apiReadAllNotification = async (): Promise<ResponseBody<any>> => {
  return fetchData({
    url: 'api/notifications/read-all',
    method: 'POST',
  });
};

export const apiDeleteNotification = async (id: string): Promise<ResponseBody<any>> => {
  return fetchData({
    url: `api/notifications/${id}`,
    method: 'DELETE',
  });
};

export const apiDeleteAllNotification = async (): Promise<ResponseBody<any>> => {
  return fetchData({
    url: 'api/notifications/delete-all',
    method: 'DELETE',
  });
};
