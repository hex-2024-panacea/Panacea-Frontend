import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { apiGetCoachCourseDetail } from '@/app/api/coach';

const CoachCourseDetail = async ({ params }: { params: { id: string } }) => {
  const {
    data: {
      user: { name: userName, avatar },
      course: { name, coverImage, description, subCategory },
      meetingUrl,
      startTime,
      endTime,
      isCanceled,
    },
  } = await apiGetCoachCourseDetail(params.id);

  return (
    <main className="w-full">
      <div className="flex items-center justify-between">
        <Link href="/profile/coach/course-list">&lt; 返回課程清單</Link>
        <Link href={meetingUrl} target="_blank" className="btn-base">
          進入教室
        </Link>
      </div>
      <p className="heading3 mb-[20px] mt-[10px]">{name}</p>
      <Image
        src={coverImage}
        alt={name}
        width={500}
        height={200}
        className="mb-[20px] h-[300px] w-full rounded-[12px] object-cover"
      />
      <ul className="flex flex-col flex-wrap items-start gap-[20px]">
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">學員</p>
          <div className="flex items-center justify-center">
            <Image src={avatar} alt={userName} width={25} height={25} className="mr-[5px] rounded-full" />
            <p className="body">{userName}</p>
          </div>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">課程內容</p>
          <p className="body">{description}</p>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">課程類型</p>
          <ul>
            {subCategory.map((item: string, index: number) => (
              <li key={index} className="small-body rounded-[20px] border py-[2px] text-center">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">預約時間</p>
          <p className="body">
            {dayjs(startTime).format('YYYY/MM/DD')} {dayjs(startTime).format('HH:mm')} -{' '}
            {dayjs(endTime).format('HH:mm')}
          </p>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">課程狀態</p>
          <p className="body">{isCanceled ? '已取消' : '尚未開始'}</p>
        </li>
      </ul>
    </main>
  );
};

export default CoachCourseDetail;
