"use client";

import { Mail, Github, Linkedin, Twitter, Dribbble, Pen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const contacts = [
  [
    {
      icon: <Mail className="w-7 h-7" />, label: "Email", value: "dasneelakshi01@gmail.com", href: "mailto:dasneelakshi01@gmail.com"
    },
    {
      icon: <Linkedin className="w-7 h-7" />, label: "LinkedIn", value: "@neelakshi", href: "https://www.linkedin.com/in/neelakshi-das-b0ba68244/"
    },
  ],
  [
    {
      icon: <Twitter className="w-7 h-7" />, label: "Twitter", value: "@bluecoder2003", href: "https://twitter.com/bluecoder2003"
    },
    {
      icon: <Dribbble className="w-7 h-7" />, label: "Dribbble", value: "@bluecoder2003", href: "https://dribbble.com/bluecoder2003"
    },
  ],
  [
    {
      icon: <Github className="w-7 h-7" />, label: "Github", value: "@bluecoder2003", href: "https://github.com/bluecoder2003"
    },
    {
      icon: <Pen className="w-7 h-7" />, label: "Behance", value: "@neelakshi", href: "https://www.behance.net/neelakshi"
    },
  ],
];

const ConnectSection = () => {
  const { theme } = useTheme();
  const isBlue = theme === 'blue';

  return (
    <div className={`w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between gap-[20px] transition-colors duration-500 ${isBlue ? 'bg-[#093FB4]' : 'bg-white'}`}>
      <div className={`text-[28px] font-normal transition-colors duration-500 ${isBlue ? 'text-white' : 'text-black'}`}>Connect Maybe?</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {col.map((item, rowIdx) => (
              <a
                key={rowIdx}
                href={item.href}
                className={`flex items-center gap-4 group transition-all duration-300 ease-in-out ${isBlue ? 'hover:text-white/80' : 'hover:text-[#093FB4]'}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`rounded-full p-2 flex items-center justify-center border transition-colors duration-500 ${isBlue ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-zinc-200'}`}>
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className={`text-lg font-normal transition-colors duration-500 ${isBlue ? 'text-white' : 'text-black'}`}>{item.label}</span>
                  <span className={`text-base font-normal transition-colors duration-500 ${isBlue ? 'text-white/60' : 'text-zinc-500'}`}>{item.value}</span>
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectSection;
