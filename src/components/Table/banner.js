import React, { useEffect, useState } from "react";
import { Table, Image, Button, Modal } from 'antd';
import axios from 'axios';
import axiosInstance from "../Request";

const TableBanner = ({ dataChanged, setDataChanged }) => {

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={image} width={50} />,
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={() => handleView(record)}>Xem</Button>
                    <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
                </div>
            )
        }

    ];


    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://book-store-bqe8.onrender.com/banner');
                console.log(response.data.data)
                setData(response.data.data);
                setDataChanged(false);
            }
            catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchData();
        if (dataChanged) {
            fetchData();
        }
    }, [dataChanged, setDataChanged]);

    const handleView = (record) => {
        setSelectedRow(record);
        setViewModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditedData(record);
        setEditModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    const handleViewModalCancel = () => {
        setViewModalVisible(false);
    };

    const handleEditSave = async () => {
        try {
            if (editModalVisible && editedData) {
                let editedDataNew = {
                    "name": editedData.name,
                    "description": editedData.description,
                    "author": editedData.author,
                    "image": editedData.image,
                    "link": editedData.link
                }

                let newBannerId = parseFloat(editedData.banner_id)
                console.log('editedData', editedDataNew)

                const response = await axiosInstance.put(`https://book-store-bqe8.onrender.com/banner/update/${newBannerId}`, editedDataNew);

                setData(response.data.data);
                setDataChanged(true);
                console.log('Response', response.data)
            }
            setEditModalVisible(false);
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    };

    return (
        <div>
            <Table columns={columns} dataSource={data} />

            <Modal
                title="Thông tin chi tiết"
                visible={viewModalVisible}
                onCancel={() => { handleViewModalCancel(); setEditedData(null); }}
                footer={null}
            >
                {selectedRow && (
                    <div>
                        {Object.keys(selectedRow).map((key) => (
                            <p key={key}><strong>{key}:</strong> {selectedRow[key]}</p>
                        ))}
                    </div>
                )}
            </Modal>

            <Modal
                title="Chỉnh sửa thông tin"
                visible={editModalVisible}
                onCancel={handleEditModalCancel}
                onOk={handleEditSave}
            >
                {editedData && (
                    <div>
                        {Object.keys(editedData).map((key) => (
                            <p key={key}>
                                <strong>{key}:</strong>
                                {key === 'banner_id' ? (
                                    <input
                                        type="number"
                                        value={editedData[key]}
                                        onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={editedData[key]}
                                        onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                                    />
                                )}
                            </p>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    )
};
export default TableBanner;