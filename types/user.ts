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
  bankAccount?: string;
  bankName?: string;
  bankCode?: string;
}

export interface Course {
  _id: string;
  courseId: string;
  name: string;
  price: string;
  totalPrice: string;
  purchaseCount: string;
  remainingCount: number;
  bookingCount: number;
  status: string;
  paymentType: string;
  payTime: string;
  createdAt: string;
  imageUrl: string;
  course: {
    coach: {
      name: string;
      avatar: string;
      _id: string;
    };
    _id: string;
    name: string;
    coverImage: string;
    description: string;
    category: Array<string>;
    subCategory: Array<string>;
  };
}

export interface PurchasedPageProps {
  status: string;
}
