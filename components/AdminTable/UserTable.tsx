'use client';
import { useState, useMemo } from 'react';
import { Table, Button, Input, Modal, Divider, type TableProps } from 'antd';
import type { UserListType } from '@/types/admin';
import { getUserList, editUser } from '@/app/api/admin/user';

interface DataType {
  key: string;
  _id: string;
  name: string;
  email: number;
  birthday: string;
  emailVerifiedAt: string;
}

export default function UserTable(props: { resultData: UserListType }) {
  const { resultData } = props;
  const [tableData, setTableData] = useState<DataType[] | any>(resultData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<DataType | any>(null);
  const [editData, setEditData] = useState<DataType | any>(null);

  const columns: TableProps<DataType | any>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: '_id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: '註冊時間',
        dataIndex: 'emailVerifiedAt',
        key: 'emailVerifiedAt',
      },
      {
        title: '操作',
        key: 'action',
        render: (_: any, record: any) => (
          <span>
            <Button type="primary" onClick={() => handleEdit(record)}>
              編輯
            </Button>
          </span>
        ),
      },
    ],
    [],
  );
  const handleEdit = (record: DataType) => {
    setModalData(record);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await editUser(modalData._id, editData)
      .then(() => {
        getUserList().then((res) => {
          setTableData(res.data);
        });
      })
      .finally(() => {
        setIsModalOpen(false);
        setModalData(null);
      });
  };
  return (
    <>
      <Table columns={columns} dataSource={tableData} rowKey={(record) => record._id} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
      >
        <p>ID{modalData?._id}</p>
        <Divider />
        <p>
          姓名：
          <Input
            defaultValue={modalData?.name}
            type="string"
            onChange={(text) => {
              setEditData({ ...editData, name: text.target.value });
            }}
          />
        </p>
        <Divider />
        <div>
          Email：
          <Input
            defaultValue={modalData?.email}
            type="string"
            onChange={(text) => {
              setEditData({ ...editData, email: text.target.value });
            }}
          />
        </div>
        <Divider />
        <div>
          生日：
          <Input
            type="date"
            onChange={(text) => {
              setEditData({ ...editData, birthday: text.target.value });
            }}
          />
        </div>
      </Modal>
    </>
  );
}
