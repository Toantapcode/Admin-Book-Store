import React, { useState } from "react";
import { Form } from "antd";
import TableProduct from '../components/Table/product';
import ButtonAdd from "../components/ButtonAdd";
import AddProductModal from "./ModalAdd/product";
import axiosInstance from "../components/Request";

export const Product = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async (values) => {
        try {
            const response = await axiosInstance.post(
                'https://book-store-bqe8.onrender.com/product/create',
                values
            );
            console.log('Value:', values);
            console.log(response)
                handleCancel();
        } catch (error) {
            console.error("Error while sending data to server:", error);
        }
    };


    return (
        <div>
            <ButtonAdd onClick={showModal} />
            <TableProduct />
            <AddProductModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
        </div>
    );
};

export default Product;
