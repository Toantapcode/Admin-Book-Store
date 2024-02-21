import React, { useState, useEffect } from 'react';
import { Table, Image, Button, Modal } from 'antd';
import axios from 'axios'
import axiosInstance from '../Request'



const TableProduct = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);


    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => (
                <span>
                    In Stock: {quantity.inStock}; Sold: {quantity.sold}
                </span>
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={image} width={50} />,
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

    // const handleDelete = async (key) => {
    //     try {
    //         await axiosInstance.delete(`https://book-store-bqe8.onrender.com/product/delete/${key}`);
    //         const newData = data.filter((item) => item.product_id !== key);
    //         console.log({ data, key })
    //         setData(newData);
    //     }
    //     catch (error) {
    //         console.error('Error fetching data: ', error);
    //     }

    // };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://book-store-bqe8.onrender.com/product?sort=high-low&category=2&');
                console.log(response.data.data)
                setData(response.data.data);
                setDataChanged(false);
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


                const response = await axiosInstance.put(`https://book-store-bqe8.onrender.com/product/update/${editedData.product_id}`, editedData);

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
            <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />
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
                                    {key === 'quantity' ? (
                                        <div>
                                            <label>In Stock:</label>
                                            <input
                                                type="number"
                                                value={editedData[key].inStock}
                                                onChange={(e) => setEditedData({ ...editedData, [key]: { ...editedData[key], inStock: e.target.value } })}
                                            />
                                            <br />
                                            <label>Sold:</label>
                                            <input
                                                type="number"
                                                value={editedData[key].sold}
                                                onChange={(e) => setEditedData({ ...editedData, [key]: { ...editedData[key], sold: e.target.value } })}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type={typeof editedData[key] === 'number' ? 'number' : 'text'}
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
export default TableProduct;