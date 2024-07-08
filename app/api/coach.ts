import fetchData from '@/util/request';
import { ResponesBody } from '@/types/request';
import { CourseList } from '@/types/courses';

// 取得教練授課課程
export const apiGetTeachCourseList = async (): Promise<ResponesBody<CourseList[]>> => {
  return fetchData({
    url: 'api/coach/booking-course',
    method: 'GET',
  });
};

// 取得教練授課詳情
export const apiGetCoachCourseDetail = async (id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/coach/booking-course/${id}`,
    method: 'GET',
  });
};

// 教練取得課程列表
export const apiGetCoachCourseList = async (): Promise<ResponesBody<CourseList[]>> => {
  return fetchData({
    url: '/api/coach/course',
    method: 'GET',
  });
};

// 教練取得課程授課時間
export const apiGetCoachCourseTime = async (params: any, id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `/api/ccoach/course/${id}/schedule`,
    method: 'GET',
    params,
  });
};

// 教練建立課程
export const apiCreateCourse = async (data: any): Promise<ResponesBody<any>> => {
  return fetchData({
    url: 'api/coach/course',
    method: 'POST',
    data,
  });
};

// 教練取消課程
export const apiCancelCourse = async (data: any, id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/coach/booking-course/${id}/cancel`,
    method: 'POST',
    data,
  });
};

// 教練建立編輯課程授課時間
export const apiCreateCourseTime = async (data: any, id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/coach/course/${id}/schedule`,
    method: 'POST',
    data,
  });
};

// 教練建立編輯課程授課時間
export const apiCreateCoursePrice = async (data: any, id: string): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/coach/course/${id}/price`,
    method: 'POST',
    data,
  });
};

// 刪除課程
export const apiDeleteCourse = async (id: string, params: any): Promise<ResponesBody<any>> => {
  return fetchData({
    url: `api/coach/course/${id}`,
    method: 'DELETE',
    params,
  });
};
