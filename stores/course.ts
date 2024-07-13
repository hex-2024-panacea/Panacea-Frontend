import { create } from 'zustand';
import { Course, Meta } from '@/types/courses';

interface CourseState {
  courses: Course[];
  meta: Meta;
  setCourses: (courses: Course[]) => void;
  setMeta: (meta: Meta) => void;
}

const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  meta: {} as Meta,
  setCourses: (courses) => set((state) => ({ ...state, courses })),
  setMeta: (meta) => set((state) => ({ ...state, meta })),
}));

export default useCourseStore;
