import classnames from "classnames";
import React from 'react';
import Text from '../Typography/Text';
import { CardProps } from './GridCardProps';

interface ExtendedCardProps extends CardProps {
  gridCols?: number;
  children?: React.ReactNode;
  className?: string;
  titleIcon?: any;
}

const GridCard: React.FC<ExtendedCardProps> = ({
  gridCols = 4,
  title,
  titleIcon,
  actions,
  children,
  className
}) => {
  const getGridColsClass = (gridCols: number): string => {
    switch (gridCols) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'md:grid-cols-2';
      case 3:
        return 'md:grid-cols-3';
      case 4:
        return 'md:grid-cols-4';
      // Add more cases for other possible grid column values if needed
      default:
        return 'grid-cols-4'; // Default to 4 columns if an invalid value is provided
    }
  };

  return (
    <div className={"bg-white rounded p-lg shadow"}>
      {(title || actions) && (
        <div className="mb-4 flex items-center">
          <div className="flex items-center gap-2">
            {title && <Text type="title" color="text-gray" className="uppercase">{title}</Text>}
            {titleIcon}
          </div>
          <div className="flex-none">{actions}</div>
        </div>
      )}
      <div className={classnames(className, `pb-sm grid gap-x-6 gap-y-2 ${getGridColsClass(gridCols)}`)}>
        {children}
      </div>
    </div>
  );
};

export default GridCard;
