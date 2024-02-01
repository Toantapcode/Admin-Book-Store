import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';

const UserModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  

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
    <Modal title="Add User" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please enter a last name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'Please enter a first name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please select a password' }]}>
        <Input />
        </Form.Item>
        <Form.Item name="telephone" label="Phone" rules={[{ required: true, message: 'Please enter a phone number' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
