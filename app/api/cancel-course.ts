import fetchData from '@/util/request';

interface CancelBookingCoursePostData {
  userCancelReason: string;
}

export const cancelBookingCourse = async (courseId: string, data: CancelBookingCoursePostData) => {
  const response = await fetchData({
    url: `api/user/booking-course/${courseId}/cancel`,
    method: 'POST',
    data,
  });
  return response;
};
