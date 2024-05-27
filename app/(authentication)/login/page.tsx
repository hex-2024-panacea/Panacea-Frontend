'use client';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Image from 'next/image';
import loginImage from '/public/login.svg';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface LoginData {
    email: string;
    password: string;
  }

  // get submit data

  const onFinish = async(values: any) => {
    setLoading(true);
    try {
      // Process filteredValues (without rememberMe)
      const { rememberMe, ...filteredValues } = values;
      await loginUser(filteredValues);
    } finally {
      setLoading(false);
    }
  };

  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  //   console.log('Failed:', errorInfo);
  // };

  // 登入
  // TODO: loginUser 改為 hook
  const loginUser = async (postData: LoginData): Promise<void> => {
    try {
      const apiPath = '/api/login';
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.log(data, 'data');
      if(data.code !== 200){
        message.error('登入失敗！請檢查是否輸入正確');
        return
      }
      // 跳轉至首頁
      router.push('/');
      message.success('登入成功！');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="text-center mb-10">
        <h3 className="text-2xl">歡迎回來！</h3>
      </div>
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={loginImage} alt="Picture of the author" />
        <Form
          className="w-1/2 max-w-[400px]"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: '請輸入正確的 email 格式',
              },
              { required: true, message: '請輸入 email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div className="mb-5">
            <Link href="/forgot-password">忘記密碼</Link>
          </div>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
