import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddBannerModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


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
        <Form.Item name="image" label="image" rules={[{ required: true, message: 'Please enter the banner img url' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="link" label="link" rules={[{ required: true, message: 'Please enter a valid link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="author" rules={[{ required: true, message: 'Please enter a valid author' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBannerModal;
