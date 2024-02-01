import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddProductModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    return false;
  }
  const onOkClicked = async () => {
    try {
      const values = await form.validateFields();
      handleOk(values);
      console.log('t', values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
    }
  }



  return (
    <Modal title="Add Product" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
      <Form form={form} layout="vertical" name="product_form">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="quantity_inStock" label="Quantity In Stock" rules={[{ type: 'number', min: 0, required: true, message: 'Please enter a valid quantity' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="quantity_sold" label="Quantity Sold" rules={[{ type: 'number', min: 0, required: true, message: 'Please enter a valid quantity' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ type: 'number', min: 0, required: true, message: 'Please enter a valid price' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ type: 'number', min: 0, required: true, message: 'Please enter a valid rating' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a valid description' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
          </Upload>
        </Form.Item>
        <Form.Item name="category_id" label="Category" rules={[{ type: 'number', min: 0, required: true, message: 'Please enter a valid category id' }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
