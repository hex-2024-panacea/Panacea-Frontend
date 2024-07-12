import Link from 'next/link';
import { TeamOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: 'userManage',
    label: '使用者管理',
    icon: <UserOutlined />,
    children: [{ key: 'userList', label: <Link href="/admin/user">使用者列表</Link> }],
  },
  {
    key: 'coachManage',
    label: '教練管理',
    icon: <TeamOutlined />,
    children: [{ key: 'coachList', label: <Link href="/admin/coach">教練列表</Link> }],
  },
  {
    key: 'courseManage',
    label: '課程管理',
    icon: <ProfileOutlined />,
    children: [{ key: 'courseList', label: <Link href="/admin/course">課程列表</Link> }],
  },
  {
    key: 'orderManage',
    label: '訂單管理',
    icon: <ProfileOutlined />,
    children: [{ key: 'orderList', label: <Link href="/admin/order">訂單列表</Link> }],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <section className="container mx-auto mt-[120px] flex w-full flex-row gap-x-10">
        <aside className="mb-10 h-full w-64">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </aside>
        <main className="w-full">{children}</main>
      </section>
    </div>
  );
}
