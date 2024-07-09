// import Image from "next/image"
import { apiGetTeachCourseList } from '@/app/api/coach';
import CoachCard from '@/components/CoachCard';

export default async function CourseListPage() {
  const { data, meta } = await apiGetTeachCourseList();
  console.log({ data, meta });

  return (
    <main>
      <div>
        <h2 className="heading2 mb-[30px]">課程清單</h2>
        <ul className="flex flex-wrap gap-[30px]">
          {data.map((item) => (
            <li key={item._id}>{<CoachCard data={item} />}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
