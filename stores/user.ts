import { create } from 'zustand';
import { UserInfo } from '@/types/user';

interface UserInfoWithSetter extends UserInfo {
  setUserInfo: (userInfo: UserInfo) => void;
}

const userStore = create<UserInfoWithSetter>((set) => ({
  _id: '',
  birthday: '',
  coachStatus: '',
  avatar: '',
  name: '',
  email: '',
  isAdmin: false,
  isCoach: false,
  certifiedDocuments: [],
  earnings: 0,
  actualAmount: 0,
  approvalStatus: '',
  reason: '',
  language: [],
  education: {
    startDate: '',
    endDate: '',
    schoolName: '',
    major: '',
    degree: '',
    _id: '',
  },
  specialty: '',
  subject: '',
  workExperience: {
    startYear: '',
    endYear: '',
    startMonth: '',
    endMonth: '',
    department: '',
    position: '',
    title: '',
    _id: '',
  },
  setUserInfo: (userInfo: Partial<UserInfo>) => set((state) => ({ ...state, ...userInfo })),
}));

export default userStore;
