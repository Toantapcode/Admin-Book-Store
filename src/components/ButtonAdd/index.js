import {
    PlusOutlined,
} from '@ant-design/icons'
import { Button} from 'antd';

const ButtonAdd = ({ onClick }) => {
    return (
        <Button key="add" icon={<PlusOutlined />} type="primary" style={{ marginRight: '10px', marginBottom:'20px' }} onClick={onClick}>
            Thêm
        </Button>
    );
};

export default ButtonAdd;