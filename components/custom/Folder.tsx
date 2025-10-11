import React from 'react';
import Image from 'next/image';

interface FolderProps {
  isOpen?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  logo?: string;
  logoAlt?: string;
}

export default function Folder({ 
  isOpen = false, 
  onClick, 
  size = 'large',
  className = '',
  logo,
  logoAlt = 'Folder logo'
}: FolderProps) {
  return (
    <div 
      className={`folder ${size} ${isOpen ? 'open' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="back">
        {logo && (
          <div className="folder-logo">
            <Image
              src={logo}
              alt={logoAlt}
              width={60}
              height={60}
              className="logo-image"
            />
          </div>
        )}
      </div>
      <div className="paper"></div>
      <div className="paper"></div>
      <div className="paper"></div>
      <div className="cover"></div>
    </div>
  );
}
