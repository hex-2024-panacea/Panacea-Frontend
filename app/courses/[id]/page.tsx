// import { CourseDetails } from '@/types/courses'
import { getCourseDetails } from '@/app/api/course';
// import Image from 'next/image';
import bg from '../../../public/bg-pagetop.svg';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  console.log(params);
  const data = await getCourseDetails(params.id);
  console.log(data);

  return (
    <main className="min-h-[100dvh] pt-[80px]">
      <header
        style={{ backgroundImage: `url(${bg.src})` }}
        className="flex h-[400px] items-center justify-center bg-cover"
      ></header>
      <main className="mt-[-80px] flex flex-col items-center justify-center rounded-tl-[100px] bg-[#fff] pt-[80px]">
        <div className="mb-[60px] flex w-full max-w-[1296px] flex-col gap-[40px] px-[36px]"></div>
      </main>
    </main>
  );
}
