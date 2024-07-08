import { create } from 'zustand';

interface UserInfo {
  avatar: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isCoach: boolean;
  certifiedDocuments?: string[];
  earnings?: number;
  actualAmount?: number;
  approvalStatus?: string;
  reason?: string | null;
  language?: string[];
  education?: {
    startDate: string;
    endDate: string;
    schoolName: string;
    major: string;
    degree: string;
    _id: string;
  };
  specialty?: string;
  subject?: string;
  workExperience?: {
    startYear: string;
    endYear: string;
    startMonth: string;
    endMonth: string;
    department: string;
    position: string;
    title: string;
    _id: string;
  };
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const userStore = create<UserInfo>((set) => ({
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
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
}));

export default userStore;
