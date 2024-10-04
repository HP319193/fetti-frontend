import { Button, Dropdown } from 'components';
import React, { FunctionComponent, useMemo } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import styles from './PageHeader.module.scss';
import classnames from 'clsx';

export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ItemType[];
    actionButtons?: React.ReactNode;
    onActionSelected?: (e: any) => any;
}

const PageHeader: FunctionComponent<PageHeaderProps> = (props) => {
    const menu = useMemo(() => {
        return <Menu onClick={props.onActionSelected} items={props.actions} />;
    }, [props.actions, props.onActionSelected]);

    return (
        <div className={classnames(styles.page_header, 'flex gap-4')}>
            <div className="flex flex-col flex-1">
                <h1 className="font-semibold mb-0 ml-0">{props.title}</h1>
                {props.description && (
                    <p className="text-gray-400 m-0">{props.description}</p>
                )}
            </div>

            <div
                className={classnames(
                    styles.action_buttons,
                    'flex-0 flex gap-1 items-baseline'
                )}
            >
                {props.actionButtons}
                {props.actions && props.actions.length > 0 && (
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button type="text">
                            <div className="flex gap-2 items-center text-gray-500">
                                <span className="text-gray-500 text-sm">Actions</span>
                                <DownOutlined className="text-xs" />
                            </div>
                        </Button>
                    </Dropdown>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
