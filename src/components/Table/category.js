import React, { useEffect, useState } from "react";
import { Table, Image, Button, Modal } from 'antd';
import axios from 'axios';
import axiosInstance from "../Request";

const TableCategory = () => {

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
    const [dataChanged, setDataChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://book-store-bqe8.onrender.com/category');
                console.log(response.data.data)
                setData(response.data.data);
            }
            catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchData();
      
    }, [dataChanged]);

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
                    "description": editedData.description
                }

                let newCategoryId = parseFloat(editedData.category_id)
                console.log('editedData', editedDataNew)

                const response = await axiosInstance.put(`https://book-store-bqe8.onrender.com/category/update/${newCategoryId}`, editedDataNew);

                setData(response.data.data);
                console.log('Response', response.data)
                setDataChanged(prevDataChanged => !prevDataChanged);
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
                                {key === 'category_id' ? (
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
export default TableCategory;