import fetchData from '@/util/request';

interface UpdateUserPostData {
  name: string;
  avatar: string;
}

export const updateUser = async (data: UpdateUserPostData) => {
  try {
    const response = await fetchData({
      url: 'api/auth/update-user',
      method: 'PATCH',
      data,
    });
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};
