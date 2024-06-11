import { useState } from 'react';
import { Button, Form } from 'antd';
import useFormStore from '@/stores/applyCoachFormStore';
import UploadComponent from './UploadComponent';

const StepFour = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, prevStep, nextStep } = useFormStore();
  const [fileList, setFileList] = useState<any[]>(formData.fileList || []);

  const validateMessages = {
    required: '此為必填',
  };

  // get submit data
  const onFinish = (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    setFormData(values);
    nextStep();
  };

  console.log('formData:', formData);

  return (
    <div className="max-w-[800px] mx-auto flex justify-center">
      <Form
        form={form}
        initialValues={formData}
        className="w-1/2 max-w-[400px]"
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div className="my-5 flex gap-2">
          <Button ghost type="primary" onClick={nextStep}>
            下一步(測試用)
          </Button>
        </div>
        <Form.Item name="file" label="Upload">
          <UploadComponent fileList={fileList} setFileList={setFileList} />
        </Form.Item>

        <div className="flex gap-2 justify-end">
          <div className="felx-1">
            <Button block type="primary" ghost onClick={prevStep}>
              上一步
            </Button>
          </div>
          <Form.Item className="felx-1">
            <Button block type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default StepFour;
