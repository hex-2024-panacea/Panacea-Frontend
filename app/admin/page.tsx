import React from 'react';
import { TeamOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import AdminTable from '@/components/AdminTable/AdminTable';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'userManage',
    label: '使用者管理',
    icon: <UserOutlined />,
    children: [
      { key: 'as9', label: 'Option 9' },
      { key: 'fd10', label: 'Option 10' },
      { key: 'gfd11', label: 'Option 11' },
      { key: 'fgh12', label: 'Option 12' },
    ],
  },
  {
    key: 'cocahManage',
    label: '教練管理',
    icon: <TeamOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'orderManage',
    label: '訂單管理',
    icon: <ProfileOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

export default function adminPage() {
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
        <main className="w-full">
          <AdminTable />
        </main>
      </section>
    </div>
  );
}
