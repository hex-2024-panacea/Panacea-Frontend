import fetchData from '@/util/request';

interface PurchasePostData {
  courseId: string;
  name: string;
  price: number;
  amount: number;
}

export const setCoursePurchase = async (data: PurchasePostData) => {
  const response = await fetchData({
    url: 'api/coach/course/purchase',
    method: 'POST',
    data,
  });
  return response;
};
