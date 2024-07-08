import fetchData from '../../util/request';
import { ResponesBody } from '@/types/request';
import { UserInfo } from '@/types/user';

export const getUserInfo = async (): Promise<ResponesBody<UserInfo>> => {
  return fetchData({
    url: 'api/auth/user-info',
    method: 'GET',
  });
};

export const apiGetNotification = async (): Promise<ResponesBody<any>> => {
  return fetchData({
    url: 'api/notifications',
    method: 'GET',
  });
};
export const apiReadNotification = async (id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/notifications/${id}`,
    method: 'POST',
  });
};

export const apiReadAllNotification = async (): Promise<ResponesBody<any>> => {
  return fetchData({
    url: 'api/notifications/read-all',
    method: 'POST',
  });
};

export const apiDeleteNotification = async (id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/notifications/${id}`,
    method: 'DELETE',
  });
};

export const apiDeleteAllNotification = async (): Promise<ResponesBody<any>> => {
  return fetchData({
    url: 'api/notifications/delete-all',
    method: 'DELETE',
  });
};
