import { Mail, Github } from "lucide-react";
import { RiBehanceFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { FaDribbble } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const contacts = [
  [
    {
      icon: <Mail className="w-7 h-7" />, label: "Email", value: "dasneelakshi01@gmail.com", href: "mailto:dasneelakshi01@gmail.com"
    },
    {
      icon: <FaLinkedinIn className="w-7 h-7" />, label: "LinkedIn", value: "@bluecoder2003", href: "https://linkedin.com/in/bluecoder2003"
    },
  ],
  [
    {
      icon: <RiTwitterXFill className="w-7 h-7" />, label: "Twitter", value: "@bluecoder2003", href: "https://twitter.com/bluecoder2003"
    },
    {
      icon: <FaDribbble className="w-7 h-7" />, label: "Dribbble", value: "@bluecoder2003", href: "https://dribbble.com/bluecoder2003"
    },
  ],
  [
    {
      icon: <Github className="w-7 h-7" />, label: "Github", value: "@bluecoder2003", href: "https://github.com/bluecoder2003"
    },
    {
      icon: <RiBehanceFill className="w-7 h-7" />, label: "Behance", value: "@bluecoder2003", href: "https://behance.net/bluecoder2003"
    },
  ],
];

const ConnectSection = () => {
  return (
    <div className="bg-[#F5F5F5] w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between gap-[20px]">
      <div className="text-[28px] font-normal text-black">Connect Maybe?</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {col.map((item, rowIdx) => (
              <a
                key={rowIdx}
                href={item.href}
                className="flex items-center gap-4 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bg-white rounded-full p-2 flex items-center justify-center border border-zinc-200">
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-lg font-normal text-black">{item.label}</span>
                  <span className="text-base font-normal text-zinc-500">{item.value}</span>
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