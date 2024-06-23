'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PurchasedCourseCard from './components/PurchasedCourseCard';

// const onChange = (key: string) => {
//   console.log(key);
// };

const items: TabsProps['items'] = [
  {
    key: 'PAID',
    label: '已完成購買',
    children: <PurchasedCourseCard status={'PAID'}></PurchasedCourseCard>,
  },
  {
    key: 'UNPAID',
    label: '未付款',
    children: <PurchasedCourseCard status={'UNPAID'}></PurchasedCourseCard>,
  },
  {
    key: 'CANCEL',
    label: '已取消',
    children: <PurchasedCourseCard status={'CANCEL'}></PurchasedCourseCard>,
  },
];

const PurchasedPage: React.FC = () => {
  return <Tabs className="w-full" defaultActiveKey="PAID" items={items} />;
};

export default PurchasedPage;
