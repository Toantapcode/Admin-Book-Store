import React, { useState, useEffect } from 'react';
import { Table, Image, Button, Modal } from 'antd';
import axios from 'axios'
import axiosInstance from '../Request'



const TableReview = ({ dataChanged, setDataChanged }) => {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedData, setEditedData] = useState(null);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ảnh ',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={image} width={50} />,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
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


    const handleDelete = async (key) => {
        // try {
        //     await axiosInstance.delete(`https://book-store-bqe8.onrender.com/product/delete/${key}`);
        //     const newData = data.filter((item) => item.product_id !== key);
        //     console.log({ data, key })
        //     setData(newData);
        // }
        // catch (error) {
        //     console.error('Error fetching data: ', error);
        // }

    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://book-store-bqe8.onrender.com/review/allReviews');
                setData(response.data.data);
                setDataChanged(false);
            } catch (error) {
                console.error('Error fetching reviews: ', error);
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

    const handleViewModalCancel = () => {
        setViewModalVisible(false);
    };

    const handleEdit = (record) => {
        setEditedData(record);
        setEditModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    const handleEditSave = async () => {
        try {
            if (editModalVisible && editedData) {


                const response = await axiosInstance.put(`https://book-store-bqe8.onrender.com/review/update/${editedData.order_id}`, editedData);

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
                onCancel={handleViewModalCancel}
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
                                    {key === '' ? (
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
    );
}


export default TableReview;