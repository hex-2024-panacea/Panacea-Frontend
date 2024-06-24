export default interface Course {
  id: string;
  _id: string;
  course: {
    name: string;
    coverImage: string | null;
  };
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  user: {
    name: string;
  };
  status: string;
}
