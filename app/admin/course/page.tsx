import CourseTable from '@/components/AdminTable/CourseTable';
import { getCourseList } from '@/app/api/admin/course';

export default async function coursePage() {
  const data = await getCourseList();
  console.log(data.data);
  return <CourseTable resultData={data.data} />;
}
