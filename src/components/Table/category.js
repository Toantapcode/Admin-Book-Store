import React, { useEffect, useState } from "react";
import { Table, Image, Button, Modal, Checkbox } from 'antd';
import axios from 'axios';
import axiosInstance from "../Request";

const TableCategory = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleRowSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const handleCheckboxChange = (categoryId, checked) => {
        if (checked) {
            setSelectedRowKeys([...selectedRowKeys, categoryId]);
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(id => id !== categoryId));
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedRowKeys.map(id => axiosInstance.delete(`https://book-store-bqe8.onrender.com/category/delete/${id}`)));
            setDataChanged(true);
            setSelectedRowKeys([]);
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    };


    const columns = [
        {
            title: 'Chọn',
            dataIndex: 'category_id',
            render: (_, record) => (
                <Checkbox onChange={(e) => handleCheckboxChange(record.category_id, e.target.checked)} />
            ),
        },
        {
            title: 'STT',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Hành động',
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
            <Button type="primary" onClick={handleDeleteSelected} disabled={selectedRowKeys.length === 0}>Xóa đã chọn</Button>
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
                            <p key={key}><strong>{key}:</strong>
                                <input
                                    type="text"
                                    value={selectedRow[key]}
                                    readOnly={true}
                                />
                            </p>
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
                        {Object.keys(editedData)
                            .filter(key => key !== '_id' && key !== '__v')
                            .map((key) => (
                                <p key={key}>
                                    <strong>{key}:</strong>
                                    {key === 'category_id' ? (
                                        <input
                                            type="number"
                                            value={editedData[key]}
                                            onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                                        />
                                    ) : key === 'status' ? (
                                        <select
                                            value={editedData[key]}
                                            onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    )

                                        : (
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