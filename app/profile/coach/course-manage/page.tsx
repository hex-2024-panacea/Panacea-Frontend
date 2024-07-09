// import Image from "next/image"
import { apiGetCoachCourseList } from '@/app/api/coach';
import CoachCard from '@/components/CoachCard';

export default async function CourseManagePage() {
  const { data, meta } = await apiGetCoachCourseList();
  console.log(meta);

  return (
    <main className="mb-[40px]">
      <div>
        <div className="mb-[30px]">
          <h2 className="heading2">課程管理</h2>
          <button>新增課程</button>
        </div>
        <ul className="flex flex-wrap gap-[30px]">
          {data.map((item) => (
            <li key={item._id}>{<CoachCard data={item} />}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
