import { getCourseDetails, getCoachCourseTime } from '@/app/api/course';
import CoachSchedule from '@/components/CoachSchedule';
import CoursePrice from './components/CoursePrice';
import Image from 'next/image';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const {
    data: {
      name,
      coach: { _id, name: coachName, specialty },
      coverImage,
      description,
      coursePrice,
    },
  } = await getCourseDetails(params.id);

  const { data: courseTime } = await getCoachCourseTime(_id, params.id);
  const courseSchedule = courseTime.reduce(
    (pre, { available, booked }) => {
      return { available: [...pre.available, ...available], booked: [...pre.booked, ...booked] };
    },
    { available: [], booked: [] },
  );

  return (
    <main className="min-h-[100dvh] pt-[80px]">
      <header
        style={{ backgroundImage: `url(${coverImage})` }}
        className="flex h-[400px] items-center justify-center bg-cover"
      />
      <main className="mt-[-80px] flex items-center justify-center rounded-tl-[100px] bg-[#fff] pt-[80px]">
        <div className="mb-[60px] flex flex-col gap-[40px] px-[36px]">
          <div>
            <h4 className="heading4 text-primary-500">{specialty}</h4>
            <h1 className="heading1">{coachName}</h1>
          </div>
          <div>
            <p className="body text-primary-500">課程名稱</p>
            <h2 className="heading2 mb-[20px]">{name}</h2>
            <p className="small-body text-[#525252]">{description}</p>
          </div>
          <CoachSchedule data={courseSchedule} />
        </div>
        <div className="mt-[-200px] flex flex-col items-start justify-center">
          <div className="mb-[50px] box-border rounded-[8px] bg-[#fff] p-[9px]">
            <Image src={coverImage} alt="icon" width={400} height={400} className="h-[400px] w-[306px] object-cover" />
          </div>

          <CoursePrice coursePrice={coursePrice} courseId={params.id} name={name}></CoursePrice>
          {/* <ul className="flex flex-col gap-[25px]">
            {coursePrice.map(({ count, price }, index) => (
              <li
                key={index}
                // onClick={() => getPurchaseInfo({ courseId: params.id, count, price })}
                className="box-border flex w-[410px] cursor-pointer items-end justify-between rounded-[8px] bg-[#fff] bg-[rgba(188,227,250,0.2)] px-[16px] pb-[23px] pt-[36px] hover:bg-[rgba(188,227,250,0.5)]"
              >
                <p className="body text-[#525252]">
                  {count} 堂 {count * 60} 分鐘
                </p>
                <p className="heading1 text-primary-500">
                  <span className="heading5">NT$</span>
                  {price}
                </p>
              </li>
            ))}
          </ul> */}
        </div>
      </main>
    </main>
  );
}
