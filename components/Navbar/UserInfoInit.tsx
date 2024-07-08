'use client';

import { useEffect } from 'react';
import userStore from '@/stores/user';
import { UserInfo } from '@/types/user';

export default function UserInfoInitializer({ userInfo }: { userInfo: UserInfo }) {
  const { setUserInfo } = userStore();

  useEffect(() => {
    if (userInfo?.name) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  return null;
}
