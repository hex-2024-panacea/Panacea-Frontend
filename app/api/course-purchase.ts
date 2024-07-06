import fetchData from '@/util/request';

interface PurchasePostData {
  courseId: string;
  name: string;
  price: number;
  amount: number;
}

export const setCoursePurchase = (postData: PurchasePostData) =>
  fetchData({
    url: 'api/coach/course/purchase',
    method: 'POST',
    data: postData,
  });
