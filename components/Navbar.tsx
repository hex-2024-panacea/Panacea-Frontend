'use client';
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center pt-[30px] pb-[23px]">
      <div className="">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={200} height={26} className="mr-[60px]" />
          <p>課程列表</p>
        </div>
      </div>
    </nav>
  );
}