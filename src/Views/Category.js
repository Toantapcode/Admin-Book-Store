import React, { useState } from "react";
import { Form } from "antd";
import TableCategory from '../components/Table/category'  
import ButtonAdd from "../components/ButtonAdd";
import AddCategoryModal from "./ModalAdd/CateModalAdd";
import axiosInstance from "../components/Request";

export const Category = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        try {
            const response = await axiosInstance.post(
                '/category/create', 
                values
            );

            console.log('API Response:', response);
                handleCancel();
        } catch (error) {
            console.error("Error while sending data to server:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <ButtonAdd onClick={showModal} />
            <TableCategory />
            <AddCategoryModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
        </div>
    );
};

export default Category;
