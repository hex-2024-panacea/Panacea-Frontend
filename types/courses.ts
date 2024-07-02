export interface CourseListParams {
  page: number;
  courseName?: string;
  category?: string;
}

export interface CourseList {
  _id: string;
  name: string;
  coach: string;
  coverImage: string;
  description: string;
  category: [string];
  subCategory: [string];
  startDate: string;
  isActive: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetails {
  _id: string;
  name: string;
  coach: {
    _id: string;
    name: string;
    specialty: string;
  };
  coverImage: string;
  description: string;
  category: [string];
  subCategory: [string];
  startDate: string;
  isActive: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
  courseSchedule: {
    startTime: string;
    endTime: string;
  };
  coursePrice: {
    _id: string;
    count: number;
    price: number;
  }[];
}
