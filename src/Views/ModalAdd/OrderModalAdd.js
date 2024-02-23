import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Table, Button, Select } from "antd";
import axiosInstance from "../../components/Request";

const { Option } = Select;

const AddOrderModal = ({ isModalVisible, showModal, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`https://book-store-bqe8.onrender.com/product/search/${searchTerm}`);
                setSearchResult(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (searchTerm !== "") {
            fetchProduct();
        }
    }, [searchTerm]);

    const handleProductSearch = () => {
        setSearchTerm(form.getFieldValue("productName"));
    };

    const handleProductSelection = (product) => {
        setSelectedProduct(product);
    };

    const handleUserSearch = async () => {
        try {
            const userId = form.getFieldValue("userId");
            const response = await axiosInstance.get(`https://book-store-bqe8.onrender.com/user/getUserById/${userId}`);
            setSelectedUser(response.data);

            const fullName = `${response.data.first_name} ${response.data.last_name}`;
            // Set user data to form fields
            form.setFieldsValue({
                'contact.full_name': fullName,
                'contact.phone_number': response.data.telephone,
                'contact.email': response.data.email,
                'address': response.data.address ? response.data.address.address : ''
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const onOkClicked = async () => {
        try {
            const values = await form.validateFields();
            // Gửi thông tin đơn hàng qua API
            const orderData = {
                contact: {
                    full_name: selectedUser ? `${selectedUser.last_name} ${selectedUser.first_name}` : '',
                    phone_number: selectedUser ? selectedUser.telephone : '',
                    email: selectedUser ? selectedUser.email : '',
                },
                address: {
                    address: selectedUser.address ? selectedUser.address.address : '',
                    ward: selectedUser.address ? selectedUser.address.ward : '',
                    district: selectedUser.address ? selectedUser.address.district : '',
                    province: selectedUser.address ? selectedUser.address.province : '',
                },

                products: [{
                    product_id: selectedProduct ? selectedProduct.product_id : '',
                    price: selectedProduct ? selectedProduct.price : '',
                    quantity: values.quantity,
                }],
                payment: values.payment,
                status: values.status
            };
            console.log(orderData)

            handleOk(orderData);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };


    return (
        <Modal title="Thêm đơn hàng" visible={isModalVisible} onOk={onOkClicked} onCancel={handleCancel}>
            <Form form={form} layout="vertical" name="order_form">
                <Form.Item label="Tên đầy đủ" >
                    <Input value={selectedUser ? `${selectedUser.last_name} ${selectedUser.first_name} ` : ''} readOnly />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input value={selectedUser ? selectedUser.telephone : ''} readOnly />
                </Form.Item>
                <Form.Item label="Email">
                    <Input value={selectedUser ? selectedUser.email : ''} readOnly />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                    <Input value={selectedUser ? `${selectedUser.address ? selectedUser.address.address : ''}, ${selectedUser.address ? selectedUser.address.ward : ''}, ${selectedUser.address ? selectedUser.address.district : ''}, ${selectedUser.address ? selectedUser.address.province : ''}` : ''} readOnly />
                </Form.Item>





                <Form.Item label="Tên sản phẩm">
                    <Form.Item name="productName" noStyle>
                        <Input style={{ width: 'calc(100% - 100px)', marginRight: '8px' }} />
                    </Form.Item>
                    <Button type="primary" onClick={handleProductSearch}>
                        Tìm sản phẩm
                    </Button>
                </Form.Item>

                <Table
                    columns={[
                        { title: "ID", dataIndex: "id", key: "id" },
                        { title: "Tên", dataIndex: "name", key: "name" },
                        { title: "Giá", dataIndex: "price", key: "price" },
                        {
                            title: "Chọn",
                            render: (_, record) => (
                                <Button type="primary" onClick={() => handleProductSelection(record)}>
                                    Chọn
                                </Button>
                            ),
                        },
                    ]}
                    dataSource={searchResult}
                    pagination={false}
                />

                {selectedProduct && (
                    <>
                        <Form.Item label="Chọn sản phẩm">
                            <Input value={selectedProduct.name} readOnly />
                        </Form.Item>
                        <Form.Item label="Giá">
                            <InputNumber value={selectedProduct.price} readOnly />
                        </Form.Item>
                    </>
                )}

                <Form.Item label=" ID người dùng">
                    <Form.Item name="userId" noStyle>
                        <InputNumber style={{ width: 'calc(100% - 100px)', marginRight: '8px' }} />
                    </Form.Item>
                    <Button type="primary" onClick={handleUserSearch}>
                        Chọn người dùng
                    </Button>
                </Form.Item>



                <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
                    <InputNumber />
                </Form.Item>

                <Form.Item name="payment" label="Payment" rules={[{ required: true, message: 'Please enter the payment method' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please enter the status' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddOrderModal;
