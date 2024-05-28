'use client';
import { Button, Checkbox, Form, Input } from 'antd';
import Image from 'next/image';
import loginImage from '/public/looking_out.svg';
import Link from 'next/link';


// get submit data
const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
//   console.log('Failed:', errorInfo);
// };

export default function ForgotPassword() {
  return (
    <main className="flex flex-col justify-center h-screen items-center">
      <div className="flex justify-center items-center w-full">
        <Image className="w-1/2 max-w-[300px]" src={loginImage} alt="Picture of the author" />
        <div className="w-1/2 max-w-[400px]">
          <div className="mb-5">
            <h3 className="text-lg text-center mb-3">寄送密碼重置信</h3>
            <p>請輸入你在本系統所使用的 Email，我們會發送一封信件，點擊信件中的連結以重設密碼。</p>
          </div>
          <Form
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
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                送出
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
