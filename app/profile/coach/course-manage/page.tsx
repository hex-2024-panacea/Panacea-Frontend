'use client';
import React, { useEffect, useState } from 'react';
import { apiGetCoachCourseList } from '@/app/api/coach';
import CoachCard from '@/components/CoachCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CourseManagePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiGetCoachCourseList();
      setData(data);
    };

    fetchData();
  }, []);

  const linkToCreate = () => {
    router.push('/profile/coach/course-manage/create');
  };

  return (
    <main style={{ marginBottom: '40px' }}>
      <div className="flex flex-col">
        <div className="mb-[30px] flex items-center justify-between">
          <p className="heading2">課程管理</p>
          <button className="btn-base" onClick={linkToCreate}>
            新增課程
          </button>
        </div>
        <ul className="flex flex-wrap gap-[30px]">
          {data.map((item) => (
            <li key={item._id} className="h-full">
              <Link href={`course-list/${item._id}`}>
                <CoachCard data={item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default CourseManagePage;
