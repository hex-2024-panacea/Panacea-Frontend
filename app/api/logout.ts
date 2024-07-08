import fetchData from '@/util/request';

export const logout = async () => {
  return await fetchData({
    url: 'api/auth/logout',
    method: 'POST',
  });
};
