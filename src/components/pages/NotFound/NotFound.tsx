import { Result } from 'antd';
import { Button } from 'components/basic';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary">
                    <Link to='/'>Back to Home</Link>
                </Button>
        }
        />
    );
};

export default NotFoundPage;
