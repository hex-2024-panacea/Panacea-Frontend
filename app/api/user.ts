import fetchData from '../../util/request';
import { ResponesBody } from '@/types/request';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isCoach: boolean;
  coachStatus: string;
  code: string;
}

export const getUserInfo = async (): Promise<ResponesBody<UserInfo>> => {
  return fetchData({
    url: 'api/auth/user-info',
    method: 'GET',
  });
};
