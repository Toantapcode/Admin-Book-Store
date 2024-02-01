import React, { useState } from "react";
import { Form } from "antd";
import TableUsers from '../components/Table/users'
import ButtonAdd from "../components/ButtonAdd";
import UserModal from "./ModalAdd/UserModalAdd";
import axiosInstance from "../components/Request";

export const Users = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();


    const showModal = () => {
        setIsModalVisible(true);
    };

   const handleOk = async (values) => {
        try {
            const response = await axiosInstance.post(
                '/user/createUser',
                values
            );
            console.log('Value:', values);
            console.log('Response:' ,response)
                console.error("Failed to create user");
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
            <TableUsers />
            <UserModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />

        </div>
    )
}

export default Users;