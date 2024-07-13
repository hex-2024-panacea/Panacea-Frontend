'use client';

import { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination, Select } from 'antd';
import Image from 'next/image';
import WeeklySchedule from '@/components/WeeklySchedule';

import bg from '@/public/bg-pagetop.svg';

import useCourseStore from '@/stores/course';
import { getCourseList } from '@/app/api/course';
import { CourseList } from '@/types/courses';

export default function CoursesPage() {
  const [coursesList, setData] = useState<CourseList>([]);
  const [current, setCurrent] = useState(1);
  const [courseName, setCourseName] = useState('');
  const [selectCategory, setCategory] = useState('');
  const { courses, meta, setCourses, setMeta } = useCourseStore();

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
    getData(page);
  };

  const getData = async (page = 1) => {
    const params: { page: number; courseName?: string; category?: string } = { page };

    if (courseName) params.courseName = courseName;
    if (selectCategory) params.category = selectCategory;

    const { data, meta } = await getCourseList(params);

    setData(data);
    setCourses(data);
    setMeta(meta);
  };

  useEffect(() => {
    document.title = '課程列表';

    if (courses.length) {
      setData(courses);
      setMeta(meta);
    } else {
      getData();
    }
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
        <div className="mb-[60px] flex w-full max-w-[1296px] gap-[10px] px-[36px]">
          <Select
            defaultValue=""
            style={{ width: 160 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            onChange={(value) => {
              setCategory(value);
            }}
            options={[
              {
                value: '心靈',
                label: '心靈',
              },
              {
                value: '健康',
                label: '健康',
              },
              {
                value: '職涯',
                label: '職涯',
              },
              {
                value: '',
                label: '全部',
              },
            ]}
          />
          <input
            type="text"
            className="small-body rounded-[6px] border border-neutral-200 px-[10px] py-[4px] focus-visible:outline-none"
            placeholder="請輸入課程名稱"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <button className="btn-base small-body" onClick={() => getData(1)}>
            搜尋
          </button>
        </div>
        <ul className="mb-[60px] flex w-full max-w-[1296px] flex-col gap-[40px]">
          {coursesList.length === 0 && <p>沒有課程</p>}
          {coursesList.map(({ _id, coverImage, name, rating, description, recurrenceSchedules }) => (
            <li
              key={_id}
              className="group relative flex gap-[25px] rounded-[36px] bg-gradient-to-r from-[#fff] to-[rgba(23,127,172,0.1)] p-[36px]"
            >
              <Image
                src="/icon-course-card.svg"
                alt={name}
                width={215}
                height={215}
                className="absolute bottom-0 right-0"
              />
              <img src={coverImage} alt={name} className="h-[360px] w-[270px] rounded-[8px] object-cover" />
              <div className="max-w-[415px]">
                <h3 className="heading2 mb-[12px]">{name}</h3>
                <div className="mb-[36px] flex items-center gap-[36px] text-[#525252]">
                  <div className="flex items-center">
                    <Image src="/star.svg" alt="star" width={24} height={24} className="mr-[5px]" />
                    <span className="body">{rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Image src="/comment.svg" alt="comment" width={20} height={20} className="mr-[5px]" />
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
          <Pagination current={current} onChange={onChange} total={meta.total} />
        </div>
      </main>
    </main>
  );
}
