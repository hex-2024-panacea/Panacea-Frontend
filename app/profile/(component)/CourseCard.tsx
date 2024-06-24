import Course from '@/types/Course';
import { Image } from 'antd';
interface Props {
  course?: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="border-gray-200 inline-grid w-[300px] rounded-l border-2">
      <div className="max-h-full min-h-[240px] bg-primary-200">
        {course?.course.coverImage ? (
          <Image
            src={course.course.coverImage}
            alt="cover image"
            className="h-40 w-full object-cover"
            preview={false}
          />
        ) : (
          <div className="bg-gray-200 h-40 w-full"></div>
        )}
      </div>
      <div className="p-3">
        <span className="text-2xl font-bold">{course?.course.name}</span>
        <ul>
          <li>學員 {course?.user.name}</li>
          <li>預約日期 {course?.courseSchedule.startTime}</li>
          <li>預約時間 {course?.courseSchedule.startTime}</li>
          <li>課程狀態 {course?.status}</li>
        </ul>
      </div>
    </div>
  );
}
