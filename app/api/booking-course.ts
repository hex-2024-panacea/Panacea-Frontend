import fetchData from '@/util/request';

interface BookingCoursePostData {
  course: string;
  courseSchedule: string;
  order: string;
}

export const bookingCourse = async (postData: BookingCoursePostData) => {
  return await fetchData({
    url: `api/user/booking-course`,
    method: 'POST',
    data: postData,
  });
};
