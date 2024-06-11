import { useState } from 'react';
import useFormStore from '@/stores/applyCoachFormStore';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import UploadComponent from './UploadComponent';
const StepOne = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, nextStep } = useFormStore();
  const [fileList, setFileList] = useState<any[]>(formData.fileList || []);

  const validateMessages = {
    required: '此為必填',
  };

  // get submit data
  const onFinish = (values: any) => {
    setFormData(values);
    nextStep();
  };

  console.log('formData:', formData);
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setFormData({ file: info.file });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="my-5">
        <Button ghost type="primary" onClick={nextStep}>
          下一步(測試用)
        </Button>
      </div>
      <Form
        form={form}
        initialValues={formData}
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="flex gap-4">
          <div>
            <Form.Item name="file" label="Upload">
              <UploadComponent fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </div>
          <div className="w-3/5 ml-auto">
            <Form.Item
              label="教授科目"
              name="subject"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select>
                <Select.Option value="心靈">心靈</Select.Option>
                <Select.Option value="職涯">職涯</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex gap-2">
              <Form.Item
                className="flex-1"
                label="會說語言"
                name="language"
                rules={[{ required: true, message: '請選擇' }]}
              >
                <Select>
                  <Select.Option value="中文">中文</Select.Option>
                  <Select.Option value="英文">英文</Select.Option>
                  <Select.Option value="台語">台語</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="flex-1"
                label="程度"
                name="languageLevel"
                rules={[{ required: true, message: '請選擇' }]}
              >
                <Select>
                  <Select.Option value="略懂">略懂</Select.Option>
                  <Select.Option value="中等">中等</Select.Option>
                  <Select.Option value="精通">精通</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              className="flex-1"
              label="教學專長"
              name="specialty"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select>
                <Select.Option value="心靈">心靈</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StepOne;
