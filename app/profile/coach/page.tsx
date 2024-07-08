'use client';

// import Image from 'next/image';
import userStore from '@/stores/user';
import dayjs from 'dayjs';

export default function CoachProfilePage() {
  const {
    certifiedDocuments,
    education: { startDate, endDate, schoolName, major, degree },
    workExperience: { startYear, endYear, startMonth, endMonth, department, position, title },
    specialty,
  } = userStore();

  return (
    <main className="flex flex-col px-[36px]">
      <h2 className="heading2 mb-[30px]">教練檔案</h2>

      <ul className="mb-[30px] flex flex-col gap-[20px]">
        <li>
          <p>專業項目</p>
          <div>
            <p>{specialty}</p>
          </div>
        </li>
        <li>
          <p>學歷</p>
          <ul>
            <li>
              {`${dayjs(startDate).format('YYYY/MM/DD')} - ${dayjs(endDate).format('YYYY/MM/DD')} ${schoolName} ${major} ${degree}`}
            </li>
          </ul>
        </li>
        <li>
          <p>經歷</p>
          <ul>
            <li>{`${startYear}/${startMonth} - ${endYear}/${endMonth} ${department} ${position} ${title}`}</li>
          </ul>
        </li>
        <li>
          <p>專業證照</p>
          <ul>
            {certifiedDocuments &&
              certifiedDocuments.map((item) => (
                <li key={item}>
                  <p>{item}</p>
                  {/* <Image src={item} alt="certified documents" width={400} height={400} className="object-cover" /> */}
                </li>
              ))}
          </ul>
        </li>
        <li>
          <p>匯款帳號</p>
          <ul>
            <li></li>
          </ul>
          <button>更新匯款帳號</button>
        </li>
      </ul>

      <p className="text-red">教練檔案內容，如需修改，請洽系統管理員</p>
    </main>
  );
}
