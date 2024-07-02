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

export interface CourseListParams {
  page: number;
  courseName?: string;
  category?: string;
}
