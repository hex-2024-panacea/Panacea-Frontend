'use client';
import { Table, type TableProps } from 'antd';
import type { UserListType } from '@/types/admin';

interface DataType {
  key: string;
  _id: string;
  name: string;
  email: number;
  birthday: string;
  emailVerifiedAt: string;
}
const columns: TableProps<DataType | any>['columns'] = [
  {
    title: 'id',
    dataIndex: '_id',
    key: 'id',
  },
  {
    title: '訂單名稱',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '購買數量',
    dataIndex: 'purchaseCount',
    key: 'purchaseCount',
  },
  {
    title: '購買價格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '總價格',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: '訂單狀態',
    dataIndex: 'status',
    key: 'status',
  },
];
export default function UserTable(props: { resultData: UserListType }) {
  const { resultData } = props;

  return (
    <Table
      pagination={{ position: ['none', 'bottomCenter'] }}
      columns={columns}
      dataSource={resultData}
      rowKey={(record) => record._id}
    />
  );
}
