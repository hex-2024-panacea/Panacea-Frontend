'use client';

import { getCourseList } from '@/app/api/course';
import WeeklySchedule from '@/components/WeeklySchedule';
import bg from '@/public/bg-pagetop.svg';
import comment from '@/public/comment.svg';
import iconCourse from '@/public/icon-course-card.svg';
import star from '@/public/star.svg';
import type { PaginationProps } from 'antd';
import { Pagination, Select } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const recurrenceSchedules = [
  {
    startedAt: '2024-07-02T00:00:00.000+08:00',
    endedAt: '2024-07-04T00:30:00.000+08:00',
  },
  {
    startedAt: '2024-07-02T11:00:00.000+08:00',
    endedAt: '2024-07-03T14:00:00.000+08:00',
  },
  {
    startedAt: '2024-07-02T19:00:00.000+08:00',
    endedAt: '2024-07-05T00:30:00.000+08:00',
  },
  {
    startedAt: '2024-07-03T10:00:00.000+08:00',
    endedAt: '2024-07-06T12:00:00.000+08:00',
  },
];

// interface pagination {
//   currentPage: number;
//   total: number;
//   perpage: number;
//   lastPage: number;
// }

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

export default function CoursesPage() {
  const [coursesList, setData] = useState<object[]>([]);

  useEffect(() => {
    document.title = '課程列表';

    const getData = async () => {
      const { data, meta } = await getCourseList({ page: 1 });
      setData(data);
      console.log(data, meta);
    };
    getData();
  }, []);

  return (
    <main className="min-h-[100dvh] pt-[80px]">
      <header
        style={{ backgroundImage: `url(${bg.src})` }}
        className="flex h-[400px] items-center justify-center bg-cover"
      >
        <div className="w-[1296px] pb-[100px]">
          <p className="heading1">課程列表</p>
          <span className="heading4 text-primary-500">Course List</span>
        </div>
      </header>
      <main className="mt-[-80px] flex flex-col items-center justify-center rounded-tl-[100px] bg-[#fff] pt-[80px]">
        <div className="mb-[60px] flex w-full max-w-[1296px] flex-col gap-[40px] px-[36px]">
          <Select
            defaultValue="4"
            style={{ width: 160 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={[
              {
                value: '1',
                label: '心靈',
              },
              {
                value: '2',
                label: '營養',
              },
              {
                value: '3',
                label: '職涯',
              },
              {
                value: '4',
                label: '全部',
              },
            ]}
          />
        </div>
        <ul className="mb-[60px] flex w-full max-w-[1296px] flex-col gap-[40px]">
          {coursesList.length === 0 && <p>沒有課程</p>}
          {coursesList.map(({ _id, coverImage, name, rating, description }) => (
            <li
              key={_id}
              className="group relative flex gap-[25px] rounded-[36px] bg-gradient-to-r from-[#fff] to-[rgba(23,127,172,0.1)] p-[36px]"
            >
              <Image src={iconCourse.src} alt={name} width={215} height={215} className="absolute bottom-0 right-0" />
              <img src={coverImage} alt={name} className="h-[360px] w-[270px] rounded-[8px] object-cover" />
              <div className="max-w-[415px]">
                <h3 className="heading2 mb-[12px]">{name}</h3>
                <div className="mb-[36px] flex items-center gap-[36px] text-[#525252]">
                  <div className="flex items-center">
                    <Image src={star.src} alt="star" width={24} height={24} className="mr-[5px]" />
                    <span className="body">{rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Image src={comment.src} alt="comment" width={20} height={20} className="mr-[5px]" />
                    <span>個評論</span>
                  </div>
                </div>
                <p className="small-body mb-[36px] text-[#525252]">{description}</p>
                <p className="mb-[36px] cursor-pointer text-[12px] text-primary-500 underline">瀏覽更多</p>
                <div className="text-right">
                  <a
                    href={`courses/${_id}`}
                    className="small-body rounded-[4px] bg-primary-500 px-[16px] py-[4px] text-[#fff]"
                  >
                    查看課程詳情
                  </a>
                </div>
              </div>
              <div className="hidden group-hover:block">
                <WeeklySchedule data={recurrenceSchedules} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mb-[80px]">
          <Pagination total={1000} itemRender={itemRender} />
        </div>
      </main>
    </main>
  );
}
