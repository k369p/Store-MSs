import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children, 
  onClick,
  hoverable = false
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hoverable ? 'transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  className = '',
  overlay
}) => {
  return (
    <div className="relative">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full object-cover ${className}`} 
      />
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          {overlay}
        </div>
      )}
    </div>
  );
};

interface CardBodyProps {
  className?: string;
  children: ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

interface CardTextProps {
  className?: string;
  children: ReactNode;
}

export const CardText: React.FC<CardTextProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <p className={`text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};