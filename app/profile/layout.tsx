import React from 'react';
import SideBar from './sidebar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[40px] pt-[80px]">
      {/* <div className="mb-[2rem] w-full bg-primary-200 px-24 py-5">
        <div>帳號設定</div>
        <div>Account preference</div>
      </div> */}
      <section className="mx-auto mt-10 px-10">
        <div className="flex flex-row gap-x-10">
          <SideBar />
          {children}
        </div>
      </section>
    </div>
  );
}
