import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal } from 'antd';
import axiosInstance from '../Request';
import axios from 'axios';



const TableUser = ({ dataChanged, setDataChanged }) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text, record) => `${record.last_name} ${record.first_name}`,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Phone',
      dataIndex: 'telephone',
      key: 'telephone',
      render: (text) => <a>{text}</a>,
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('https://book-store-bqe8.onrender.com/user/getAllUsers');
        setData(response.data);
        setDataChanged(false);
      } catch (error) {
        console.error('Error fetching users: ', error);
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


        const response = await axiosInstance.put(`https://book-store-bqe8.onrender.com/user/${editedData.order_id}`, editedData);

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
                {key === '' ? (
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
  );
};

export default TableUser;
