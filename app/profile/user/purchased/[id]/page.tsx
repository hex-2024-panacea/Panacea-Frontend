'use client';
import { getCourseDetails, getCoachCourseTime } from '@/app/api/course';
import CoachScheduleNew from '@/components/CoachScheduleNew';
import { useEffect, useState } from 'react';
import { Tag, message, Button } from 'antd';
import { bookingCourse } from '@/app/api/booking-course';
import dayjs from 'dayjs';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
  searchParams: {
    orderId: string;
  };
}
// booking-course api fetch data interface
interface BookingCoursePostData {
  course: string;
  courseSchedule: string;
  order: string;
}

export default function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
  const [courseScheduleRange, setCourseScheduleRange] = useState<any>('');
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [courseSchedule, setCourseSchedule] = useState<any>({ available: [], booked: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseDetailsResponse = await getCourseDetails(params.id);
        const { data: courseDetailsData } = courseDetailsResponse;

        if (!courseDetailsData) {
          throw new Error('Course details not found');
        }

        const { name, coach, coverImage, description, coursePrice } = courseDetailsData;

        const courseTimeResponse = await getCoachCourseTime(coach._id, params.id);
        const { data: courseTimeData } = courseTimeResponse;

        if (!courseTimeData) {
          throw new Error('Course schedule not found');
        }

        const courseSchedule = courseTimeData.reduce(
          (pre: any, { available, booked }: any) => {
            return { available: [...pre.available, ...available], booked: [...pre.booked, ...booked] };
          },
          { available: [], booked: [] },
        );

        setCourseDetails({
          name,
          coach,
          coverImage,
          description,
          coursePrice,
        });

        setCourseSchedule(courseSchedule);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        // Handle error state or show a message
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseDetails) {
    return <div>Course details not found.</div>;
  }

  const { name, coach, coverImage, description } = courseDetails;

  // 取得選擇的課程時間 ID
  const handleCourseScheduleRange = (data: any) => {
    setCourseScheduleRange(data);
  };

  // post booking-course api
  const handleBookingCourse = async () => {
    const postData: BookingCoursePostData = {
      course: params.id,
      courseSchedule: courseScheduleRange._id,
      order: searchParams.orderId,
    };
    const res = await bookingCourse(postData);
    if (res.code === 200) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <main className="min-h-[100dvh] w-full">
      <header
        style={{ backgroundImage: `url(${coverImage})` }}
        className="flex h-[250px] items-center justify-center bg-cover"
      />
      <main className="mt-[-80px] flex items-center justify-center rounded-tl-[100px] bg-[#fff] pt-[80px]">
        <div className="mb-[60px] flex w-full flex-col gap-[40px] px-[36px]">
          <div>
            <Tag color="blue">{coach.specialty}</Tag>
            <h4 className="text-lg">{coach.name}</h4>
          </div>
          <div>
            <p className="body text-primary-500">課程名稱</p>
            <h2 className="heading2 mb-[20px]">{name}</h2>
            <p className="small-body text-[#525252]">{description}</p>
          </div>
          <div className="flex">
            <div className="w-[616px]">
              <CoachScheduleNew data={courseSchedule} sendCourseScheduleRange={handleCourseScheduleRange} />
            </div>
            <div className="ml-10 mt-[300px]">
              <div className="mb-5">選擇的時間：</div>
              {courseScheduleRange ? (
                <div>
                  <span>{dayjs(courseScheduleRange?.startTime).format('YYYY/MM/DD HH:mm')}</span>~{' '}
                  <span>{dayjs(courseScheduleRange?.endTime).format('YYYY/MM/DD HH:mm')}</span>
                </div>
              ) : (
                <div>尚未選擇時間</div>
              )}

              <Button className="mt-5" disabled={!courseScheduleRange} type="primary" onClick={handleBookingCourse}>
                預約課程
              </Button>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
