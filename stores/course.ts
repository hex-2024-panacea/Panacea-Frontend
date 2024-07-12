import { create } from 'zustand';
import { Course } from '@/types/courses';

interface CourseState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
}));

export default useCourseStore;
