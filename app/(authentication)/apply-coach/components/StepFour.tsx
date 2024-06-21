'use client';
import { useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import useFormStore from '@/stores/applyCoachFormStore';
import UploadComponent from './UploadComponent';

const StepFour = () => {
  const [form] = Form.useForm();
  const { formData, setFormData, prevStep, nextStep, fileList, setFileList } = useFormStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  const handleFileListChange = (fileList: any[]) => {
    console.log('🚀 ~ handleFileListChange ~ fileList:', fileList);
    setFileList(fileList); // 更新 Zustand 中的 fileList
  };

  const handleLoadingChange = (loading: boolean) => {
    setLoading(loading);
  };

  const validateMessages = {
    required: '此為必填',
  };
  // get submit data
  const onFinish = () => {
    // TODO: 把轉圖片 URL 的邏輯移到這裡
    // 取得文件的 URL
    const getImageUrls = fileList.map((file) => {
      return file.response.data.imageUrl;
    });
    const imageUrls = { certifiedDocuments: getImageUrls };
    setFormData(imageUrls);
    console.log('🚀 ~ onFinish ~ formData:', imageUrls);

    nextStep();
  };

  return (
    <div className="mx-auto flex max-w-[800px] justify-center">
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
          <UploadComponent
            action="/api/upload"
            initialFileList={fileList} // 從 Zustand 讀取初始 fileList
            onFileListChange={handleFileListChange} // 處理 fileList 變化
            onLoadingChange={handleLoadingChange} // 處理上傳狀態
            maxCount={4}
          />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <div className="felx-1">
            <Button block type="primary" ghost onClick={prevStep}>
              上一步
            </Button>
          </div>
          <Form.Item className="felx-1">
            <Button block type="primary" htmlType="submit" loading={loading}>
              下一步
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default StepFour;
