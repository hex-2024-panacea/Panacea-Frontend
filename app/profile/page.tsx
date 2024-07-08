'use client';

import { Button, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import type { UploadFile } from 'antd';
import UploadComponent from '@/components/Upload';
import userStore from '@/stores/user';
import { updateUser } from '@/app/api/update-user';

export default function ProfilePage() {
  const { name, email, avatar } = userStore();
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Process filteredValues (without rememberMe)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, ...filteredValues } = values;
      const fetchData = { ...filteredValues, avatar: profileImageUrl };
      console.log('🚀 ~ onFinish ~ fetchData:', fetchData);
      const res = await updateUser(fetchData);
      if (res.code === 200) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileListChange = (fileList: any[]) => {
    const { imageUrl } = fileList[0]?.response.data;
    setProfileImageUrl(imageUrl);
  };
  const handleLoadingChange = (loading: boolean) => {
    setLoading(loading);
  };

  useEffect(() => {
    setFileList([
      {
        uid: '',
        name: '',
        status: 'done',
        url: avatar,
      },
    ]);
  }, [avatar]);
  return (
    <main>
      <div className="flex gap-x-10">
        <div>
          <UploadComponent
            listType="picture-circle"
            action="/api/upload"
            defaultFileList={fileList}
            onFileListChange={handleFileListChange} // 處理 fileList 變化
            onLoadingChange={handleLoadingChange} // 處理上傳狀態
          />
        </div>
        <div>
          <Form initialValues={{ name, email }} className="w-full" layout="vertical" onFinish={onFinish}>
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '請輸入' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                更新資料
              </Button>
            </Form.Item>
          </Form>
          {/*  */}
          <Form className="w-full" layout="vertical" onFinish={onFinish}>
            {isChange ? (
              <>
                <Form.Item
                  name="password"
                  label="密碼"
                  rules={[
                    {
                      required: true,
                      message: '請輸入密碼',
                    },
                    { min: 8, message: '請設定至少8碼英文與數字' },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="確認密碼"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '請確認密碼',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('密碼不一致，請確認密碼是否相同'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            ) : (
              <Form.Item name="defaultPassword" label="密碼" initialValue="********">
                <Input.Password disabled />
              </Form.Item>
            )}

            {isChange ? (
              <Button type="primary" htmlType="submit" loading={loading}>
                更新密碼
              </Button>
            ) : (
              <Button onClick={() => setIsChange(true)} type="primary">
                修改密碼
              </Button>
            )}
          </Form>
        </div>
      </div>
    </main>
  );
}
