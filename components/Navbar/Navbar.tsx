import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './Dropdown';
import { cookies } from 'next/headers';
import { getUserInfo } from '@/app/api/user';
import { apiGetNotification } from '@/app/api/user';
import UserInfoInitializer from './UserInfoInit';
import { UserInfo } from '@/types/user';

interface NavbarOption {
  title: string;
  url: string;
}

let userInfo: UserInfo;

const getUserInfoHandler = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let navBarData: NavbarOption[] = [
    {
      title: '成為教練',
      url: '/signup',
    },
    {
      title: '登入',
      url: '/login',
    },
    {
      title: '註冊',
      url: '/signup',
    },
  ];

  if (token) {
    const { data } = await getUserInfo();
    const { data: notificationData } = await apiGetNotification();
    console.log(notificationData);
    console.log(data);

    userInfo = data;

    if (userInfo.isCoach) {
      navBarData = [
        {
          title: '',
          url: '/login',
        },
        {
          title: userInfo.name,
          url: '/profile',
        },
      ];
    } else {
      navBarData = [
        {
          title: '成為教練',
          url: '/apply-coach',
        },
        {
          title: '',
          url: '/login',
        },
        {
          title: userInfo.name,
          url: '/profile',
        },
      ];
    }
  }

  return { navBarData, userInfo };
};
export default async function Navbar() {
  const { navBarData, userInfo } = await getUserInfoHandler();

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-center bg-[#FFF] px-[20px] pb-[23px] pt-[30px] shadow-sm">
      <UserInfoInitializer userInfo={userInfo} />
      <div className="flex w-full max-w-[1296px] items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer">
            <Image src="/logo.svg" alt="logo" width={200} height={26} className="mr-[60px]" />
          </Link>
          <Link href="/courses" className="cursor-pointer">
            課程列表
          </Link>
        </div>
        <ul className="flex items-center gap-[30px]">
          {navBarData.map(({ url, title }, index) => (
            <li key={index}>
              {url === '/profile' ? (
                <Dropdown />
              ) : title ? (
                <Link href={url}>{title}</Link>
              ) : (
                <div>
                  <Image src="/notifications.svg" width={20} height={20} alt="notify icon" className="cursor-pointer" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
