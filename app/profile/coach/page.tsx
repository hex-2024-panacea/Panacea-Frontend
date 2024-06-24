'use client';
import { useEffect, useState } from 'react';

export default function CoachProfilePage() {
  const [remittanceAccount] = useState<any>({
    bankCode: '013',
    account: '0987215364532',
  });
  const [userInfo, setUserInfo] = useState<any>({
    _id: '666885fd6a5d238fd8e606ae',
    name: 'coach',
    email: 'coach@gmail.com',
    avatar: null,
    emailVerifiedAt: '2024-06-11T17:15:37.634Z',
    birthday: null,
    isAdmin: false,
    isCoach: true,
    certifiedDocuments: ['https://panacea/image/5', 'https://panacea/image/6'],
    earnings: 0,
    actualAmount: 0,
    approvalStatus: 'pending',
    reason: null,
    language: [
      {
        speakLanguage: 'english',
        languageLevel: '精通',
        _id: '6668866f6a5d238fd8e606b7',
      },
    ],
    education: {
      startDate: '2020-09-14T16:00:00.000Z',
      endDate: '2024-04-14T16:00:00.000Z',
      schoolName: '國立台灣大學',
      major: '英文系',
      degree: '博士',
      _id: '6668866f6a5d238fd8e606b5',
    },
    specialty: '心靈',
    subject: '心靈',
    workExperience: {
      startYear: '2020',
      endYear: '2023',
      startMonth: '04',
      endMonth: '12',
      department: '教學部門',
      position: '老師',
      title: '心靈導師',
      _id: '6668866f6a5d238fd8e606b6',
    },
  });

  async function fetchUserInfo(): Promise<any> {
    const token = 'token';
    const endpoint = process.env.NEXT_PUBLIC_API_URL + '/api/auth/user-info';
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (res.status != 200) {
      throw Error('fetch user info failed');
    }

    setUserInfo(res.data);

    return res.data;
  }

  useEffect(() => {
    fetchUserInfo();
  });

  return (
    <main>
      <div className="mb-5 text-3xl">教練檔案</div>
      <div className="my-3">
        <h5 className="my-2 text-xl">專業項目</h5>
        <div className="flex flex-row gap-3">
          <span className="rounded-2xl border-2 px-5 py-1">{userInfo.specialty}</span>
        </div>
      </div>
      <div className="my-3">
        <div className="my-2 text-xl">學歷</div>
        <ul></ul>
      </div>
      <div className="my-3">
        <div className="my-2 text-xl">經歷</div>
        <ul>
          {userInfo.workExperience && (
            <li>
              <span>{userInfo.workExperience.startYear}</span>
              <span>{userInfo.workExperience.endYear}</span>
              <span>{userInfo.workExperience.department}</span>
              <span>{userInfo.workExperience.position}</span>
              <span>{userInfo.workExperience.title}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="my-3">
        <div className="my-2 text-xl">專業證照</div>
        <div className="grid grid-cols-4 gap-3">
          <div className="h-[150px] w-[200px] bg-primary-200"></div>
          <div className="h-[150px] w-[200px] bg-primary-200"></div>
          <div className="h-[150px] w-[200px] bg-primary-200"></div>
          <div className="h-[150px] w-[200px] bg-primary-200"></div>
        </div>
      </div>
      <div className="my-3 py-3">
        <div className="my-2 text-xl">匯款帳號</div>
        <span>
          ({remittanceAccount.bankCode}){remittanceAccount.account}
        </span>
        <button className="block rounded-sm border-2 px-2 py-1">更新匯款銀行</button>
      </div>
    </main>
  );
}
