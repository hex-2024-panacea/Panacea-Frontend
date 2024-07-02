import fetchData from '../../util/request';

export const login = (postData: { email: string; password: string }) =>
  fetchData({
    url: 'api/auth/sign-in',
    method: 'POST',
    data: postData,
  });
