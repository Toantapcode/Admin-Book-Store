import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddOrderModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
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
        <Modal title="Add Order" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
            <Form form={form} layout="vertical" name="order_form">
                {/* Contact */}
                <Form.Item name={['contact', 'full_name']} label="Full Name" rules={[{ required: true, message: 'Please enter the full name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['contact', 'phone_number']} label="Phone Number" rules={[{ required: true, message: 'Please enter a valid phone number' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['contact', 'email']} label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                    <Input />
                </Form.Item>

                {/* Address */}
                <Form.Item name={['address', 'address']} label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['address', 'ward']} label="Ward" rules={[{ required: true, message: 'Please enter the ward' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['address', 'district']} label="District" rules={[{ required: true, message: 'Please enter the district' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['address', 'province']} label="Province" rules={[{ required: true, message: 'Please enter the province' }]}>
                    <Input />
                </Form.Item>

                {/* Products */}
                {/* Products */}
                <Form.List name={['products']} initialValue={[{ product_id: 0, quantity: 0, price: 0 }]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <div key={key}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'product_id']}
                                        fieldKey={[fieldKey, 'product_id']}
                                        label="Product ID"
                                        rules={[{ required: true, message: 'Please enter the product ID' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        fieldKey={[fieldKey, 'quantity']}
                                        label="Quantity"
                                        rules={[{ required: true, message: 'Please enter the quantity' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        fieldKey={[fieldKey, 'price']}
                                        label="Price"
                                        rules={[{ required: true, message: 'Please enter the price' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <button type="button" onClick={() => remove(name)}>Remove Product</button>
                                </div>
                            ))}
                            <Form.Item>
                                <button type="button" onClick={() => add()}>Add Product</button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                {/* Payment */}
                <Form.Item name="payment" label="Payment" rules={[{ required: true, message: 'Please enter the payment method' }]}>
                    <Input />
                </Form.Item>

                {/* Status */}
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please enter the status' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddOrderModal;
