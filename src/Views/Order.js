import { Form } from "antd";
import React, { useState } from "react";
import TableOrder from '../components/Table/order'
import ButtonAdd from "../components/ButtonAdd";
import AddOrderModal from "./ModalAdd/OrderModalAdd";
import axiosInstance from "../components/Request";

export const Order = () => {

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
                'order/create',
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
            <TableOrder />
            <AddOrderModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />

        </div>
    )
}