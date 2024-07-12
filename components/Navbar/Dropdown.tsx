'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userStore from '@/stores/user';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, IdcardOutlined, SettingOutlined, DownOutlined, BookOutlined } from '@ant-design/icons';
import { logout } from '@/app/api/logout';
import Cookies from 'js-cookie';

const Dropdown = () => {
  const { isCoach, isAdmin, avatar, name } = userStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
    Cookies.remove('token');
  };

  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'user',
      label: name,
      icon: <Image src={avatar} alt={'user'} width={30} height={30} className="rounded-full" />,
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: <Link href={'/profile'}>帳號設定</Link>,
      icon: <IdcardOutlined />,
    },
  ];

  if (isCoach) {
    items.push({
      key: 'coach',
      label: <Link href={'/profile/coach/course-manage'}>課程管理</Link>,
      icon: <BookOutlined />,
    });
  } else if (isAdmin) {
    items.push({
      key: 'admin',
      label: <Link href={'/admin'}>管理後台</Link>,
      icon: <SettingOutlined />,
    });
  } else {
    items.push({
      key: 'booking',
      label: <Link href={'/profile/user/booking'}>已預約課程</Link>,
      icon: <BookOutlined />,
    });
  }

  items.push({
    key: 'logout',
    label: '登出',
    icon: <LogoutOutlined />,
  });

  const handler: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      handleLogout();
    }
  };

  return (
    <div className="relative">
      <div className="flex cursor-pointer items-center gap-[10px]" onClick={() => setShowDropdown(!showDropdown)}>
        <Image src={avatar ? avatar : '/avatar.svg'} width={32} height={32} alt="Avatar" className="rounded-full" />
        <DownOutlined className={`h-[12px] w-[14px] ${showDropdown ? 'rotate-180' : ''}`} />
        {showDropdown && (
          <Menu
            onClick={handler}
            className="absolute right-0 top-[calc(100%+30px)] z-20 rounded-[12px]"
            style={{ width: 200, padding: '10px 0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
            mode="inline"
            items={items}
          />
        )}
      </div>
      {showDropdown && <div className="touch-cover" onClick={() => setShowDropdown(false)} />}
    </div>
  );
};

export default Dropdown;
