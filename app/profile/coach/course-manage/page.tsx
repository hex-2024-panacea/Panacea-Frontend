'use client';
import React, { useEffect, useState } from 'react';
import { apiGetCoachCourseList } from '@/app/api/coach';
import CoachCard from '@/components/CoachCard';
import { useRouter } from 'next/navigation';
import { Button, List, Typography } from 'antd';

const CourseManagePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, meta } = await apiGetCoachCourseList();
      console.log('🚀 ~ fetchData ~ data:', data);
      setData(data);
      setLoading(false);
      console.log(meta);
    };

    fetchData();
  }, []);

  const linkToCreate = () => {
    router.push('/profile/coach/course-manage/create');
  };

  return (
    <main style={{ marginBottom: '40px' }}>
      <div>
        <Typography.Title level={2}>課程管理</Typography.Title>
        <Button type="primary" onClick={linkToCreate}>
          新增課程
        </Button>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          loading={loading}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <CoachCard data={item} />
            </List.Item>
          )}
        />
      </div>
    </main>
  );
};

export default CourseManagePage;
