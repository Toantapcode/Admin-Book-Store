import React, { useState } from "react";
import { Form } from "antd";
import TableBanner from '../components/Table/banner'  
import ButtonAdd from "../components/ButtonAdd";
import AddBannerModal from "./ModalAdd/BannerModalAdd";
import axiosInstance from "../components/Request";

export const Banner = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [dataChanged, setDataChanged] = useState(false); 

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        try {
            const response = await axiosInstance.post(
                '/banner/create', 
                values
            );

            console.log('API Response:', response);

            handleCancel();

            setDataChanged(true);
            
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
            <TableBanner dataChanged={dataChanged} setDataChanged={setDataChanged} />
            <AddBannerModal
                isModalVisible={isModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
        </div>
    );
};

export default Banner;
