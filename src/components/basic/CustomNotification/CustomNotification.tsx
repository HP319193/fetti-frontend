import { notification } from 'antd';

interface CustomNotificationProps {
    type: 'success' | 'error';
    message: string;
    description: string;
}

const CustomNotification: React.FC<CustomNotificationProps> = ({ type, message, description }) => {
    notification[type]({
        message,
        description,
        duration: 3,
    });

    return null;
};

export default CustomNotification;
