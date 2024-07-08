// import Image from "next/image"
import { apiGetTeachCourseList } from '@/app/api/coach';

export default async function CourseListPage() {
  const { data, meta } = await apiGetTeachCourseList();
  console.log({ data, meta });

  return (
    <main>
      <div>
        <h2 className="heading2">課程清單</h2>
      </div>
    </main>
  );
}
