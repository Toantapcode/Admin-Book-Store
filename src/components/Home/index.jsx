import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,

  ContainerOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Modal, Button, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState('users');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()

  useEffect(() => {
    let key = item.key
    if (key === 'users') {
      navigate('/user')

    } else if (key === 'category') {
      navigate('/category')

    } else if (key === 'product') {
      navigate('/product')

    } else if (key === 'order') {
      navigate('/order')

    } else if (key === 'review') {
      navigate('/review')

    } else if (key === 'banner') {
      navigate('/banner')
    } else if (key === 'login') {
      navigate('/login')
    }

  }, [item])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const items = [
    getItem('Users', 'users', <PieChartOutlined />),
    getItem('Category', 'category', <DesktopOutlined />),
    getItem('Product', 'product', <ContainerOutlined />),
    getItem('Order', 'order', <DesktopOutlined />),
    getItem('Review', 'review', <ContainerOutlined />),
    getItem('Banner', 'banner', <ContainerOutlined />),
  ];



  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['user']} mode="inline" items={items} onSelect={setItem} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            style={{
              padding: 24,
              minHeight: 690,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 20
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
{/* <Menu
defaultSelectedKeys={['users']}
defaultOpenKeys={['Users']}
onSelect={setItem}
mode="inline"
theme="dark"
inlineCollapsed={collapsed}
items={items}
/> */}