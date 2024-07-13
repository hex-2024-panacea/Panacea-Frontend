'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, InputNumber, message, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import dayjs from 'dayjs';
import UploadComponent from '@/components/Upload';
import CoachScheduleNew from '@/components/CoachScheduleNew';
import { apiCreateCourse, apiCreateCoursePrice, apiCreateCourseTime } from '@/app/api/coach';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Option } = Select;

const CourseForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [courseScheduleRange, setCourseScheduleRange] = useState<any>({});

  const handleFileListChange = (fileList: any[]) => {
    const imageUrl = fileList[0]?.response?.data?.imageUrl;
    if (imageUrl) setCoverImageUrl(imageUrl);
  };

  const onFinish = async (values: any) => {
    const { price, ...courseData } = values;
    // 先建假資料

    const schedule = [
      {
        startTime: dayjs(courseScheduleRange.startTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        endTime: dayjs(courseScheduleRange.endTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      },
    ];
    if (coverImageUrl) {
      courseData.coverImage = coverImageUrl;
    } else {
      message.error('請上傳課程封面');
      return;
    }
    const priceData = { price: price };
    const scheduleData = { schedule: schedule };

    try {
      setLoading(true);
      const { data, code } = await apiCreateCourse(courseData);

      if (code !== 200) throw new Error('創建課程失敗');
      const courseId = data._id;

      await Promise.all([apiCreateCourseTime(scheduleData, courseId), apiCreateCoursePrice(priceData, courseId)]);

      message.success('課程創建成功');
      form.resetFields();
      setFileList([]);
      setCoverImageUrl('');
      router.push('/profile/coach/course-manage');
    } catch (error) {
      message.error('發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseScheduleRange = (data: any) => {
    setCourseScheduleRange(data);
  };
  // 假資料
  const availableSchedules = {
    booked: [],
    available: [
      {
        _id: '',
        startTime: '2024-08-20T09:00:00.000Z',
        endTime: '2024-08-20T10:00:00.000Z',
      },
      {
        _id: '',
        startTime: '2024-08-20T11:00:00.000Z',
        endTime: '2024-08-20T12:00:00.000Z',
      },
      {
        _id: '',
        startTime: '2024-08-20T13:00:00.000Z',
        endTime: '2024-08-20T14:00:00.000Z',
      },
    ],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ isActive: true, courseType: '營養', price: [{ count: 1, price: 1000 }] }}
    >
      <div className="mb-6">
        <h2 className="mb-2">課程封面</h2>
        <UploadComponent
          listType="picture-card"
          action="/api/upload"
          defaultFileList={fileList}
          onFileListChange={handleFileListChange}
          onLoadingChange={setLoading}
        />
      </div>
      <Form.Item name="name" label="課程名稱" rules={[{ required: true, message: '請輸入課程名稱' }]}>
        <Input placeholder="輸入課程名稱" />
      </Form.Item>
      <Form.Item name="description" label="課程內容" rules={[{ required: true, message: '請輸入課程內容' }]}>
        <TextArea rows={4} placeholder="輸入課程內容" />
      </Form.Item>
      <Form.Item name="category" label="課程類型" rules={[{ required: true, message: '請選擇課程類型' }]}>
        <Select mode="multiple">
          <Option value="營養">營養</Option>
          <Option value="身心靈">身心靈</Option>
          <Option value="職涯">職涯</Option>
        </Select>
      </Form.Item>
      <Form.Item name="isActive" label="是否開放" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.List name="price">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
                <Form.Item
                  {...restField}
                  name={[name, 'count']}
                  label="堂數"
                  rules={[{ required: true, message: '請輸入堂數' }]}
                >
                  <InputNumber controls={false} min={1} placeholder="堂數" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="價格"
                  name={[name, 'price']}
                  rules={[{ required: true, message: '請輸入價格' }]}
                >
                  <InputNumber controls={false} min={0} formatter={(value) => `NT$ ${value}`} />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(name)} />
                )}
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                新增價格
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div className="my-5">
        <CoachScheduleNew data={availableSchedules} sendCourseScheduleRange={handleCourseScheduleRange} />
        {courseScheduleRange && (
          <div className="body mt-[20px]">
            <p>選擇的課程時間：</p>
            <div className="small-body">
              {dayjs(courseScheduleRange.startTime).format('YYYY/MM/DD HH:mm')} -{' '}
              {dayjs(courseScheduleRange.endTime).format('YYYY/MM/DD HH:mm')}
            </div>
          </div>
        )}
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
