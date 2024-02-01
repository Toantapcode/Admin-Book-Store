import React, { useState } from "react";
import { Form } from "antd";
import TableReview from '../components/Table/review';
import ButtonAdd from "../components/ButtonAdd";
import AddReviewModal from "./ModalAdd/ReviewModalAdd";
import axiosInstance from "../components/Request";

export const Review = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        try {
            const response = await axiosInstance.post(
                'review/create',
                values
            );
            console.log('Value:', values);
            console.log(response)
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
            <TableReview />
            <AddReviewModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
        </div>
    );
};

export default Review;
