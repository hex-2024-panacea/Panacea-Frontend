'use client';
import { useState, useMemo } from 'react';
import { Table, Space, Tag, Button, Input, Modal, type TableProps } from 'antd';
import type { UserListType } from '@/types/admin';
import { getCourseList, reviewCourse } from '@/app/api/admin/course';

interface DataType {
  key: string;
  _id: string;
  name: string;
  email: number;
  birthday: string;
  emailVerifiedAt: string;
}

export default function CourseTable(props: { resultData: UserListType }) {
  const { resultData } = props;
  const [tableData, setTableData] = useState<DataType[] | any>(resultData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewStatus, setReviewStatus] = useState<string>('');
  const [reviewReason, setReviewReason] = useState<string>('');
  const [reviewId, setReviewId] = useState<string>('');

  const columns: TableProps<DataType | any>['columns'] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: '_id',
        key: 'id',
      },
      {
        title: '課程名稱',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '教練',
        dataIndex: 'coach',
        key: 'coachName',
        render: (text) => text.name,
      },
      {
        title: '課程價格(數量:價格)',
        dataIndex: 'coursePrice',
        key: 'coursePrice',
        render: (data) => {
          type dataType = {
            _id: string;
            count: number;
            price: number;
          };
          return data.map((item: dataType) => {
            return (
              <Tag className="mr-2" key={item._id}>
                {item.count}：{item.price}
              </Tag>
            );
          });
        },
      },
      {
        title: '課程狀態',
        dataIndex: 'approvalStatus',
        key: 'approvalStatus',
      },
      {
        title: '操作',
        key: 'action',
        render: (_: any, record: any) => (
          <Space size={[8, 16]}>
            <Button type="primary" onClick={() => handleReview(record._id, 'success')}>
              審核成功
            </Button>
            <Button type="primary" onClick={() => handleReview(record._id, 'fail')}>
              審核失敗
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );
  const handleOk = () => {
    setIsModalOpen(false);
    reviewCourse(reviewId, {
      approvalStatus: reviewStatus,
      reason: reviewReason,
    })
      .then(() => {
        getCourseList().then((res: any) => {
          setTableData(res.data);
        });
      })
      .finally(() => {
        setIsModalOpen(false);
        setReviewId('');
        setReviewStatus('');
        setReviewReason('');
      });
  };
  const handleReview = async (id: string, approvalStatus: string) => {
    setIsModalOpen(true);
    setReviewId(id);
    setReviewStatus(approvalStatus);
  };
  return (
    <>
      <Table
        pagination={{ position: ['none', 'bottomCenter'] }}
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => record._id}
      />
      <Modal
        title={reviewStatus === 'success' ? '確認審核成功' : '確認審核失敗'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setReviewId('');
          setReviewStatus('');
          setReviewReason('');
        }}
      >
        {reviewStatus === 'fail' && (
          <>
            <p>失敗原因</p>
            <Input type="text" onChange={(text) => setReviewReason(text.target.value)} />
          </>
        )}
        {reviewStatus === 'success' && <p>確定審核成功?</p>}
      </Modal>
    </>
  );
}
