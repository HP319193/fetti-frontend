import { Text } from 'components/basic';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface DetailContentLayoutProps {
    goBackLink?: string;
    title?: string;
    children: ReactNode;
    header?: ReactNode;
    setContainer?: any;
}

const DetailContentLayout: React.FC<DetailContentLayoutProps> = ({
    goBackLink,
    title,
    children,
    header,
    setContainer,
}) => {
    return (
        <div className="flex justify-center items-center" ref={setContainer}>
            <div className="w-full">
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
                {header && <div>{header}</div>}
                {title && (
                    <Text size="text-lg" fontWeight="font-semibold" className="mb-0">
                        {title}
                    </Text>
                )}
                {children}
            </div>
        </div>
    );
};

export default DetailContentLayout;
