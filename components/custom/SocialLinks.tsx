'use client'

import Link from 'next/link';
import './SocialLinks.css';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const SocialLink = ({ link }: { link: SocialLink }) => {
  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-base md:text-lg font-normal leading-tight text-black hover:text-[#093FB4] cursor-pointer inline-flex items-center gap-2 dotted-underline"
    >
      {/* <div
        className="w-4 h-4"
        style={{
          maskImage: `url(${link.icon})`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskImage: `url(${link.icon})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'contain',
          backgroundColor: '#000',
        }}
      /> */}
      {link.label}
    </Link>
  );
};

const SocialLinks = () => {
  const links: SocialLink[] = [
    {
      label: 'email',
      href: 'mailto:dasneelakshi01@gmail.com',
      icon: '/mail.svg',
    },
    {
      label: 'x',
      href: 'https://x.com/bluecoder2003',
      icon: '/x.svg',
    },
    {
      label: 'linkedIn',
      href: 'https://www.linkedin.com/in/neelakshi-das-b0ba68244/',
      icon: '/linkedin.svg',
    },
  ];

  return (
    <div className="flex gap-4 justify-between lg:items-center lg:justify-center">
      {links.map((link) => (
        <SocialLink key={link.label} link={link} />
      ))}
    </div>
  );
};

export default SocialLinks;
