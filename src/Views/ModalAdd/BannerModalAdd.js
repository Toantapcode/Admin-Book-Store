import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddBannerModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      console.error('Bạn chỉ có thể tải lên tệp ảnh JPG/PNG!');
    }
    return isJpgOrPng;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  const onOkClicked = async () => {
    try {
      const values = await form.validateFields();
      handleOk(values);
      console.log('t', values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };


  return (
    <Modal title="Add Banner" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
      <Form form={form} layout="vertical" name="banner_form">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the banner name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a valid description' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="image" label="Ảnh" extra="Bạn có thể tải lên tệp JPG/PNG tối đa 2MB hoặc nhập đường link ảnh">
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="Ảnh banner" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          <Input placeholder="Hoặc nhập đường link ảnh" style={{ marginTop: '1rem' }} />
        </Form.Item>
        <Form.Item name="link" label="link" rules={[{ required: true, message: 'Please enter a valid link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="author" rules={[{ required: true, message: 'Please enter a valid author' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default AddBannerModal;
