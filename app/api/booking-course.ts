import fetchData from '@/util/request';

interface BookingCoursePostData {
  course: string;
  courseSchedule: string;
  order: string;
}

export const bookingCourse = async (data: BookingCoursePostData) => {
  const response = await fetchData({
    url: `api/user/booking-course`,
    method: 'POST',
    data,
  });
  return response;
};
