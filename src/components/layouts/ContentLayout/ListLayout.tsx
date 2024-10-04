import { Card, Text } from 'components/basic';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ListLayoutProps {
    header?: any;
    title?: string;
    description?: string;
    searchComponent?: ReactNode;
    actionComponent?: ReactNode;
    children: ReactNode;
    goBackLink?: string;
}

const ListLayout: React.FC<ListLayoutProps> = ({
    header,
    title,
    description,
    searchComponent,
    actionComponent,
    children,
    goBackLink,
}) => {
    return (
        <Card>
            <div className="flex flex-col gap-2">
                {goBackLink && (
                    <div className="flex">
                        <Link
                            className="text-gray-500 text-sm cursor-pointer hover:text-blue"
                            to={goBackLink}
                        >
                            ← Go Back
                        </Link>
                    </div>
                )}
                {header}
                <div className="flex items-end gap-8">
                    <div className="flex-1 items-start flex flex-col gap-1">
                        <Text type="heading" size="text-lg">
                            {title}
                        </Text>
                        {description && <Text type="label">{description}</Text>}
                        {searchComponent && <div>{searchComponent}</div>}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        {actionComponent}
                    </div>
                </div>
                {children}
            </div>
        </Card>
    );
};

export default ListLayout;
