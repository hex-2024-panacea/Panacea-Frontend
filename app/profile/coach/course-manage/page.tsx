'use client';

import { Select } from 'antd';
import CourseCard from '@/app/profile/(component)/CourseCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CourseManagerPage() {
  const { CoachCourseList } = useState<any>([
    {
      _id: '666885fd6a5d238fd8e606ae',
      id: '666885fd6a5d238fd8e606ae',
      course: {
        name: '課程名稱1',
        coverImage: 'https://via.placeholder.com/500',
      },
      user: {
        name: '學員1',
      },
      courseSchedule: {
        startTime: '2024-06-11T17:15:37.634Z',
        endTime: '2024-06-11T17:15:37.634Z',
      },
      status: '已完成',
    },
  ]);

  const fetchCoachCourseList = async () => {
    try {
      const token = '';
      const endpoint = process.env.NEXT_PUBLIC_API_URL + '/api/coach/course';
      const res: Response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (res.status != 200) {
        throw Error('fetch course list failed');
      }

      setCoachCourseList(res.data);
    } catch (error) {
      console.error('fetch course list failed');
    }
  };

  useEffect(() => {
    fetchCoachCourseList();
  });

  return (
    <main>
      <div className="text-3xl">課程管理</div>
      <div className="my-5 flex flex-row gap-4">
        <Select
          defaultValue=""
          style={{ width: 160 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          options={[
            {
              value: '',
              label: '課程狀態',
            },
          ]}
        />
        <Select
          defaultValue=""
          style={{ width: 160 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          options={[
            {
              value: '',
              label: '課程排序',
            },
          ]}
        />
        <button className="rounded-md bg-primary-500 px-3 py-1 text-[#ffffff]">
          <Link href="/profile/coach/new-course">新增課程</Link>
        </button>
      </div>
      <div className="my-10 grid grid-cols-3 gap-5">
        {CoachCourseList.map((course: any) => {
          return <CourseCard course={course} key={course.id} />;
        })}
      </div>
    </main>
  );
}
