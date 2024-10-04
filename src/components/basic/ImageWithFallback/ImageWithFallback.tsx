import React, { useState } from 'react';
import classnames from "clsx";

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
  onErrorCallback?: () => void;
  firstName: string;
  lastName: string;
  className?: string,
  imgStyle?: any,
  containerStyle?: any
}

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '-';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '-';
  return `${firstInitial}${lastInitial}`;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  onErrorCallback,
  firstName,
  lastName,
  className,
  containerStyle,
  imgStyle
}) => {
  const [imageLoaded, setImageLoaded] = useState(!!src);

  const handleImageError = () => {
    if (onErrorCallback) {
      onErrorCallback();
    }
    setImageLoaded(false);
  };

  return (
    <div className={classnames("relative inline-block", className)} style={containerStyle}>
      {imageLoaded ? (
        <img
          src={src}
          onError={handleImageError}
          alt={alt}
          className="avatar"
          style={imgStyle}
        />
      ) : (
        <div className="avatar flex justify-center items-center" style={imgStyle}>
          {getInitials(firstName, lastName)}
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
