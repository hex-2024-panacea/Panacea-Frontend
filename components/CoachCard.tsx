'use client';

import React from 'react';
import { Card, Skeleton } from 'antd';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import { CourseList, BookingCourse } from '@/types/courses';

type CoachCardProps = {
  data: CourseList | BookingCourse;
};

const CoachCard = ({ data }: CoachCardProps) => {
  const isCourseList = (data: CourseList | BookingCourse): data is CourseList => {
    return 'category' in data;
  };

  const linkToCourse = (courseId: string) => {
    console.log(courseId);
  };

  // const getCoverImage = (data: CourseList | BookingCourse) => {
  //   return isCourseList(data) ? data.coverImage : data.course.coverImage;
  // };

  const getName = (data: CourseList | BookingCourse) => {
    return isCourseList(data) ? data.name : data.course.name;
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md"
      style={{ width: 300 }}
      cover={<Image alt="coverImage" width={300} height={150} src={'/test.png'} />}
      onClick={() => linkToCourse(isCourseList(data) ? data._id : data.course._id)}
    >
      <Skeleton loading={false} paragraph={{ rows: 4 }} active>
        <Card.Meta
          title={<h3 className="heading5 truncate">{getName(data)}</h3>}
          description={
            <ul className="list-none p-0">
              {isCourseList(data) ? (
                <>
                  <li>開始日期: {dayjs(data.startDate).format('YYYY/MM/DD')}</li>
                  <li>類型: {data.category.join(', ')}</li>
                  <li>子類型: {data.subCategory.join(', ')}</li>
                  <li>評分: {data.rating}</li>
                  <li>狀態: {data.isActive ? '開放中' : '停用'}</li>
                </>
              ) : (
                <>
                  <li>學員: {data.user.name}</li>
                  <li>開始時間: {dayjs(data.startTime).format('YYYY/MM/DD HH:mm')}</li>
                  <li>結束時間: {dayjs(data.endTime).format('YYYY/MM/DD HH:mm')}</li>
                  <li>狀態: {data.isCanceled ? '已取消' : '進行中'}</li>
                  {data.isCanceled && <li>取消原因: {data.userCancelReason || data.coachCancelReason || '未提供'}</li>}
                </>
              )}
            </ul>
          }
        />
      </Skeleton>
    </Card>
  );
};

export default CoachCard;
