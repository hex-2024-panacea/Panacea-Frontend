import React from "react";
import SideBar from "./sidebar";
export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="pt-[80px]">
            <div className="bg-primary-200 w-full py-5 px-3 mb-[2rem]">
                <div>已預約課程</div>
                <div>scheduled courses</div>
            </div>
            <section className="mx-auto w-3/4">
                <div className="flex flex-row gap-x-10">
                    <SideBar Username="user1"/>
                    {children}
                </div>
            </section>
        </div>
    )
}