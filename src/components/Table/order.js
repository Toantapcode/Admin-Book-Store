import React, { useEffect, useState } from "react";
import { Table, Image, Button, Modal } from 'antd';
import axios from 'axios';
import axiosInstance from "../Request";

const TableOrder = ({ dataChanged, setDataChanged }) => {

    const columns = [
        {
            title: 'Full Name',
            dataIndex: ['contact', 'full_name'],
            key: 'full_name',
        },
        {
            title: 'Phone Number',
            dataIndex: ['contact', 'phone_number'],
            key: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: ['contact', 'email'],
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: address => {
                const { province, district, ward, address: detailAddress } = address;
                return `${detailAddress}, ${ward}, ${district}, ${province}`;
            },
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: products => (
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            Product ID: {product.product_id}, Quantity: {product.quantity}, Price: {product.price}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Button type="link" onClick={() => handleView(record)}>Xem</Button>
            )
        }
    ];

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('https://book-store-bqe8.onrender.com/order');
                console.log(response);
                setData(response.data);
                setDataChanged(false);
            }
            catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchData();
    }, [dataChanged, setDataChanged]);

    const handleView = (record) => {
        setSelectedRow(record);
        setViewModalVisible(true);
    }

    const handleViewModalCancel = () => {
        setViewModalVisible(false);
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
                            <p key={key}><strong>{key}:</strong> {JSON.stringify(selectedRow[key])}</p>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    )
};
export default TableOrder;