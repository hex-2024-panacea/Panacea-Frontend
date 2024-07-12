// import Image from "next/image"
import { apiGetTeachCourseList } from '@/app/api/coach';
import CoachCard from '@/components/CoachCard';
import Link from 'next/link';

export default async function CourseListPage() {
  const { data, meta } = await apiGetTeachCourseList();
  console.log(meta);

  return (
    <main>
      <div>
        <h2 className="heading2 mb-[30px]">課程清單</h2>
        <ul className="flex flex-wrap gap-[30px]">
          {data.map((item) => (
            <li key={item._id} className="h-full">
              <Link href={`course-list/${item._id}`}>
                <CoachCard data={item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
