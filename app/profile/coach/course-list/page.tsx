'use client';

import Course from '@/types/Course';
import CourseCard from '../../(component)/CourseCard';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export default function CourseListPage() {
  const [courseList, setCourseList] = useState<Array<Course>>([
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

  const fetchCourseList = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzdkOWRhNzNhNWFmZTg5NjM1NGRjYSIsIm9hdXRoVG9rZW5JZCI6IjY2Nzk0NmJkZmJjODc3YmYxZTQ1MGNjMyIsImlhdCI6MTcxOTIyMzk5NywiZXhwIjoxNzQ5OTgyMzk3fQ.NlCvdSwW-0xBXx40PmNA932fk3_Ze88MiodsBrDmpgA';
      const endpoint = process.env.NEXT_PUBLIC_API_URL + '/api/coach/course';
      const res: Response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (res.status !== 200) {
        throw new Error('Failed to fetch course list');
      }
      setCourseList([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseList();
  });

  return (
    <main>
      <div className="text-3xl">授課清單</div>
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
      </div>
      <div className="my-10 grid grid-cols-3 gap-5">
        {courseList.length === 0 ? (
          <div>沒有任何課程</div>
        ) : (
          courseList.map((course) => <CourseCard course={course} key={course._id} />)
        )}
      </div>
    </main>
  );
}
