'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { convertCourseStatus } from '../utils';
import Link from 'next/link';
import axios from 'axios';
import { cancelBookingCourse } from '@/app/api/cancel-course';
import { Button, Skeleton, Tag, Modal, Input, message } from 'antd';

interface Course {
  _id: string;
  course: {
    name: string;
    content: string;
    coverImage: string;
    category: [string];
    subCategory: [string];
    description: string;
    _id: string;
  };
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  startTime: string;
  endTime: string;
  isCanceled: boolean;
  userCancelReason: string;
  coachCancelReason: string;
  coach: {
    name: string;
  };
  status: string;
  meetingUrl: string;
}
interface CancelBookingPostData {
  userCancelReason: string;
}

const isWithin12HoursBefore = (time: string) => {
  const targetTime = dayjs(time);
  const twelveHoursBefore = targetTime.subtract(12, 'hour');
  const now = dayjs();
  return now.isAfter(twelveHoursBefore) && now.isBefore(targetTime);
};

// 取消預約 api
const cancelBooking = async (courseId: string, postData: CancelBookingPostData) => {
  try {
    const res = await cancelBookingCourse(courseId, postData);
    if (res.code === 200) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  } catch (error) {
    console.error('Error cancel booking:', error);
    message.error('Failed to cancel booking');
  }
};

export default function BookingCoursesPage({ params }: { params: { id: string } }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userCancelReason, setUserCancelReason] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: 移除 axios
        const response = await axios.get(`/api/user/booking-course/${params.id}`);
        setCourse(response.data.data);
        setBookingId(response.data.data._id);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const showModal = () => {
    setOpen(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCancelReason(e.target.value);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const postData = {
      userCancelReason,
    };
    await cancelBooking(bookingId, postData);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setUserCancelReason('');
    setOpen(false);
  };

  if (loading) {
    return <Skeleton active />;
  }
  // 檢查物件是否有值
  if (!course) {
    return <div>No course data available.</div>;
  }

  return (
    <main className="flex min-h-[100dvh] w-full gap-5">
      <Modal title="取消預約" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <p className="mb-3">請輸入取消原因</p>
        <Input placeholder="Basic usage" value={userCancelReason} onChange={handleInputChange} />
      </Modal>
      <div className="flex flex-auto flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-lg">{course.course.name}</h3>
          <Link href={course.meetingUrl} rel="noopener noreferrer" target="_blank" passHref>
            <Button type="primary">進入教室</Button>
          </Link>
        </div>
        <div className="relative h-full max-h-[300px] w-full">
          <Image fill src={course.course.coverImage} className="rounded-md object-cover" alt="course picture"></Image>
        </div>
        <div>
          <p>教練</p>
          <p>{course.coach.name}</p>
        </div>
        <div>
          <p>課程內容</p>
          <p>{course.course.description}</p>
        </div>
        <div>
          <p>課程類型</p>
          {course.course.category.map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </div>
        <div>
          <p>預約時間</p>
          <p>
            {dayjs(course.startTime).format('YYYY/MM/DD HH:mm')} - {dayjs(course.endTime).format('HH:mm')}
          </p>
        </div>
        <div>
          <p>狀態</p>
          <Tag color={course.isCanceled ? 'red' : 'green'}>
            {convertCourseStatus(course.startTime, course.isCanceled)}
          </Tag>
        </div>
        {course.isCanceled || (
          <div>
            <Button disabled={isWithin12HoursBefore(course.startTime)} type="primary" onClick={() => showModal()}>
              取消預約
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
