import { Menu } from 'antd/lib';
import React, { FC, ReactElement, useState } from 'react';
import './NavBar.scss';

export interface NavBarProps {
    title: string;
    items?: any[];
    rightActions?: any;
}

const NavBar: FC<NavBarProps> = (props): ReactElement => {
    const [current, setCurrent] = useState(
        props.items && props.items.length > 0 ? props.items[0].key : null
    );

    const onClick = (e: any) => {
        setCurrent(e.key);

        let clickedMenu = props.items?.filter((m) => {
            return m.key === e.key;
        });

        if (clickedMenu && clickedMenu?.length > 0) {
            clickedMenu = clickedMenu[0];
        }
    };

    return (
        <div className="main-menu flex items-center px-6 gap-2 bg-white h-16">
            <h1 className="m-0 mr-8 text-xl font-semibold">{props.title}</h1>
            <div className="flex-1 flex items-center">
                {props.items && (
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={props.items}
                    />
                )}
            </div>

            {props.rightActions}
        </div>
    );
};

export default NavBar;
