import { Mail, Github, Linkedin, Twitter, Dribbble, Pen } from "lucide-react";

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
  return (
    <div className="bg-white w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between gap-[20px]">
      <div className="text-[28px] font-normal text-black">Connect Maybe?</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {col.map((item, rowIdx) => (
              <a
                key={rowIdx}
                href={item.href}
                className="flex items-center gap-4 group hover:text-[#093FB4] transition-all duration-300 ease-in-out"
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