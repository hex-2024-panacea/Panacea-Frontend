interface Language {
  speakLanguage: string;
  readLanguage: string;
}

interface Education {
  startDate: string;
  endDate: string;
  schoolName: string;
  major: string;
  degree: string;
}

interface WorkExperience {
  startYear: string;
  endYear: string;
  startMonth: string;
  endMonth: string;
  department: string;
  position: string;
  title: string;
}
export interface UserInfo {
  _id: string;
  birthday: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isCoach: boolean;
  coachStatus: string;
  reason: string;
  certifiedDocuments: string[];
  earnings: number;
  actualAmount: number;
  approvalStatus: string;
  language: Language[];
  education: Education;
  specialty: string;
  workExperience: WorkExperience;
  description?: string;
}
