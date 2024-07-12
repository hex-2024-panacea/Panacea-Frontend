'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import bg from '@/public/bg-search.svg';
import { getCourseList } from '@/app/api/course';
import { useRouter } from 'next/navigation';
import useCourseStore from '@/stores/course';
import { message } from 'antd';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const composingRef = useRef(false);
  const router = useRouter();
  const { setCourses } = useCourseStore();

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = () => {
    composingRef.current = false;
  };

  const searchCourse = async () => {
    const { data } = await getCourseList({ page: 1, courseName: searchText });
    message.success('搜尋完成');
    setCourses(data);
    router.push('/courses');
  };

  return (
    <section
      style={{ backgroundImage: `url(${bg.src})` }}
      className="mb-[80px] flex h-[640px] w-full items-center justify-center gap-[130px] bg-cover pt-[95px]"
    >
      <div>
        <div className="mb-[40px]">
          <h2 className="heading1 font-bold">尋找最適合你的課程</h2>
          <span className="heading6">讓我們陪著你尋找答案</span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchText}
            className="w-full rounded-[80px] border-[2px] border-primary-500 p-[18px] focus-visible:outline-none"
            placeholder="請輸入想尋找的課程"
            onChange={(e) => setSearchText(e.target.value)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={(e) => e.key === 'Enter' && !composingRef.current && searchCourse()}
          />
          <button
            className="absolute right-[8px] top-[50%] flex translate-y-[-50%] items-center rounded-[80px] bg-primary-500 px-[16px] py-[8px]"
            onClick={searchCourse}
          >
            <Image className="mr-[8px]" src="/icon-search.svg" alt="icon" width={20} height={20} />
            <span className="body text-[#fafafa]">搜尋</span>
          </button>
        </div>
      </div>
      <Image src="/web-search.svg" alt="icon" width={525} height={410} />
    </section>
  );
};

export default Search;
