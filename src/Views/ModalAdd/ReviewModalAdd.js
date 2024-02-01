import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddReviewModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
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
        <Modal title="Add Review" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
            <Form form={form} layout="vertical" name="eeview_form">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the banner name' }]}>
                    <Input />
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
            </Form>
        </Modal>
    );
};

export default AddReviewModal;
