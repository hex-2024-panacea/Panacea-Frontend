'use client';

import PriceList from '@/app/profile/(component)/PriceList';
import CourseTimetable from '@/app/profile/(component)/CourseTimetable';
import { Col, Form, FormProps, Input, Row, Select } from 'antd';
import { Flex } from 'antd';
import { Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type CourseInfo = {
  name?: string;
  coverImage?: string;
  description?: string;
  category?: string;
  subCategory?: string;
  startDate?: Date | null;
  isActive?: boolean;
  priceList?: Array<any>;
  time?: Array<any>;
};

export default function NewCoursePage() {
  const [form] = Form.useForm<CourseInfo>();

  async function createCourse(request: any): Promise<void> {
    const token = 'token';
    const endpoint = process.env.NEXT_PUBLIC_API_URL + '/api/coach/course';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(request),
    });
    if (res.status != 200) {
      throw new Error('create course failed');
    }
  }

  const onFinish: FormProps<CourseInfo>['onFinish'] = (values) => {
    createCourse(values);
  };

  const onFinishFailed: FormProps<CourseInfo>['onFinishFailed'] = (values) => {
    console.log(values);
  };

  return (
    <main className="">
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="name">
          <div className="my-5">
            <div className="text-l my-2 text-primary-500">課程名稱</div>
            <Input className="w-full rounded-md border p-3" />
          </div>
        </Form.Item>
        <Form.Item name="description">
          <div>
            <div className="text-l my-2 text-primary-500">課程內容</div>
            <TextArea className="w-full rounded-md border p-3" />
          </div>
        </Form.Item>
        <Row>
          <Col span={12} className="w-1/2">
            <Flex vertical gap="middle">
              <Form.Item name="category">
                <div className="text-l my-2 text-primary-500">課程類型</div>
                <Select
                  style={{ width: 300 }}
                  defaultValue={''}
                  placeholder="Select category"
                  options={[
                    {
                      value: '1',
                      label: '心理諮商',
                    },
                    {
                      value: '2',
                      label: '健身項目',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="isActive">
                <div className="text-l my-2 text-primary-500">是否開放</div>
                <Radio.Group defaultValue={false} buttonStyle="solid">
                  <Radio.Button value={true}>是</Radio.Button>
                  <Radio.Button value={false}>否</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Flex>
          </Col>
          <Col span={12}>
            <div className="text-l my-2 text-primary-500">課堂價格</div>
            <Form.Item name="priceList">
              <PriceList />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="courseTime">
          <div className="text-l my-2 text-primary-500">授課時間</div>
          <CourseTimetable />
        </Form.Item>
        <Form.Item>
          <div className="my-5 flex justify-around">
            <button className="rounded-md bg-primary-500 px-6 py-2 text-[#FFF]">新增課程</button>
          </div>
        </Form.Item>
      </Form>

      {/*<div className="min-w-[720px]">*/}
      {/*<div className="flex flex-row gap-5 w-full">*/}
      {/*    <div className="w-1/2">*/}
      {/*        <div className="text-l text-primary-500 my-2">課程類型</div>*/}
      {/*        <Select*/}
      {/*            value={courseInfo.category}*/}
      {/*            style={{width: 300}}*/}
      {/*            placeholder="Search to Select"*/}
      {/*            optionFilterProp="children"*/}
      {/*            options={[*/}
      {/*                {*/}
      {/*                    value: '1',*/}
      {/*                    label: '心理諮商'*/}
      {/*                },*/}
      {/*                {*/}
      {/*                    value: '2',*/}
      {/*                    label: '健身項目'*/}
      {/*                }*/}
      {/*            ]}*/}
      {/*        />*/}
      {/*        <div className="text-l text-primary-500 my-2">是否開放</div>*/}
      {/*        <div className="flex flex-row gap-3">*/}
      {/*            <button*/}
      {/*              className={`rounded-lg w-1/2 p-3 ${courseInfo.isActive ? 'bg-primary-500 text-[#FFF]' : 'bg-white border'}`}>是*/}
      {/*            </button>*/}
      {/*            <button*/}
      {/*              className={`rounded-lg w-1/2 p-3 ${!courseInfo.isActive ? 'bg-primary-500 text-[#FFF]' : 'bg-white border'}`}>否*/}
      {/*            </button>*/}
      {/*        </div>*/}
      {/*    </div>*/}

      {/*    <div className="w-1/2">*/}
      {/*        <div className="text-l text-primary-500 my-2">課堂價格</div>*/}
      {/*        <PriceList value={courseInfo.priceList} />*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*    <div className="text-l text-primary-500 my-2">授課時間</div>*/}
      {/*    /!*<CourseTimetable time={courseInfo.time}/>*!/*/}
      {/*</div>*/}

      {/*</div>*/}
    </main>
  );
}
