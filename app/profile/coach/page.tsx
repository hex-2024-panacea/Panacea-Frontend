'use client';

import { useState } from 'react';
import Image from 'next/image';
import userStore from '@/stores/user';
import dayjs from 'dayjs';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export default function CoachProfilePage() {
  const {
    certifiedDocuments,
    education: { startDate, endDate, schoolName, major, degree },
    workExperience: { startYear, endYear, startMonth, endMonth, department, position, title },
    specialty,
    avatar,
    bankAccount,
    bankCode,
  } = userStore();

  const [showPhoto, setShowPhoto] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);

  return (
    <main className="flex flex-col px-[36px]">
      <h2 className="heading2 mb-[30px]">教練檔案</h2>

      <ul className="mb-[30px] flex flex-col gap-[20px]">
        <li>
          <Image
            src={avatar ? avatar : '/images/avatar.png'}
            alt="avatar"
            width={200}
            height={100}
            className="rounded-[10px] object-cover"
          />
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">專業項目</p>
          <div>
            <p>{specialty}</p>
          </div>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">學歷</p>
          <ul>
            <li>
              {`${dayjs(startDate).format('YYYY/MM/DD')} - ${dayjs(endDate).format('YYYY/MM/DD')} ${schoolName} ${major} ${degree}`}
            </li>
          </ul>
        </li>
        <li>
          <p className="heading6 mb-[5px] text-neutral-400">經歷</p>
          <ul>
            <li>{`${startYear}/${startMonth} - ${endYear}/${endMonth} ${department} ${position} ${title}`}</li>
          </ul>
        </li>
        {certifiedDocuments.length && (
          <li>
            <p className="heading6 mb-[5px] text-neutral-400">
              專業證照{' '}
              <span className="text-[16px] text-neutral-400">
                {showPhoto ? (
                  <EyeOutlined onClick={() => setShowPhoto(false)} />
                ) : (
                  <EyeInvisibleOutlined onClick={() => setShowPhoto(true)} />
                )}
              </span>{' '}
            </p>
            <ul className="flex items-center gap-[20px]">
              {showPhoto &&
                certifiedDocuments.map((item, i) => (
                  <li key={i}>
                    <Image
                      src={item}
                      alt="certified documents"
                      width={200}
                      height={100}
                      className="h-[200px] w-[300px] rounded-[12px] object-cover"
                    />
                  </li>
                ))}
            </ul>
          </li>
        )}

        <li>
          <p className="heading6 mb-[5px] text-neutral-400">
            匯款帳號
            <span className="ml-[5px] text-[16px] text-neutral-400">
              {showAccount ? (
                <EyeOutlined onClick={() => setShowAccount(false)} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setShowAccount(true)} />
              )}
            </span>
          </p>
          <div className="flex items-center justify-between">
            <p>
              ({bankCode}) {bankAccount}
            </p>
            <button className="btn-base small-body">修改匯款帳號</button>
          </div>
        </li>
      </ul>

      <p className="small-body text-[#f35625]">教練檔案內容，如需修改，請洽系統管理員</p>
    </main>
  );
}
