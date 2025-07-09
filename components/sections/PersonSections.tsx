import Image from "next/image";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const timeline = [
  {
    logo: "/vng.svg",
    role: "Designer Intern",
    date: "Dec 2023 - Nov 2024",
    duration: "1 yr",
  },
  {
    logo: "/nlti.svg",
    role: "Designer Intern",
    date: "Mar 2024 - Jun 2024",
    duration: "4 mos",
  },
  {
    logo: "/vexio.svg",
    role: "Designer & Developer Intern",
    date: "Jul 2024 - Apr 2025",
    duration: "1 yr 6 mos",
  },
  {
    logo: "/cosx.svg",
    role: "Designer & Developer Intern",
    date: "Jun 2025 - Present",
    duration: "2 mos",
  },
];

// Example: adjust these values to match your desired positions
const circlePositions = ["13%", "40%", "68%", "95%"];

export default function PersonSections() {
  return (
    <section className="bg-[#F5F5F5] w-full rounded-[20px] p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="text-[28px] md:text-[32px] font-normal text-black mb-2">Behind The Pixels</div>
      <div className="flex flex-col justify-between items-center w-full max-w-5xl mx-auto">
      {/* Top Row */}
      <div className="flex flex-col justify-between items-center w-full">
      <div className={`text-[#093FB4] text-2xl font-normal ${instrumentSerif.className} mb-4`}>Peek into my life</div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Polaroid Grid */}
        <Image src="/about-one.svg" alt="polaroid" width={100} height={100} className="object-cover w-full h-full" />
        {/* Bio Text */}
          <div className="text-black text-lg font-normal">
            Born in Kolkata, the City of Joy — where every lane hums with art, culture, and color — I grew up surrounded by stories and creativity. That early chaos and charm shaped how I see and express.
            <br /><br />
            I speak Hindi, English, and Bengali — each with its own rhythm — and I&apos;m slowly picking up Spanish too. Wherever I go, that energy stays — a quiet anchor, a loud spark.
        </div>
        </div>
      </div>
      {/* Dashed Divider */}
      <div className="w-full h-[1px] my-6 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)]" />

      {/* Middle Row */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-black text-lg font-normal">
            Creativity has always been my constant — from handmade cards to intuitive UI. I fell for design through its visual charm, but it&apos;s the research and problem-solving that keep me grounded.<br />
            I&apos;m a curious soul with a love for mountains, travel, and the occasional deep-dive into random rabbit holes. Design lets me blend craft with clarity — and I wouldn&apos;t have it any other way.
          </div>
        <Image src="/about-two.svg" alt="polaroid" width={100} height={100} className="object-cover w-full h-full" />
      </div>
      {/* Timeline Header */}
      <div className="text-[#093FB4] text-2xl font-normal __className_3bda96 mb-4">Places I&apos;ve worked before</div>
      {/* Timeline */}
      <div className="relative flex flex-col items-center w-full">
        {/* Dashed Line */}
        <div className="absolute w-full h-[1px] top-4 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)] z-0" />
        
        {/* Timeline Circles */}
        {timeline.map((_, i) => (
          <div
            key={i}
            className={`absolute top-1.5 z-20`}
            style={{
              left: `calc(${circlePositions[i]} - 12px)`, // 12px = half of dot size
            }}
          >
            <div
              className={`w-4 h-4 rounded-full border-[1px] flex items-center justify-center
                ${i === timeline.length - 1 ? 'bg-[#BFBFAF] border-[#BFBFAF]' : 'bg-white border-[#BFBFAF]'}`}
            >
              {/* Optionally, inner dot for active */}
              {i === timeline.length - 1 && <div className="w-3 h-3 rounded-full bg-[#BFBFAF]" />}
            </div>
          </div>
        ))}

        {/* Timeline Items */}
        <div className="flex flex-row justify-between w-full gap-24 z-10 pt-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex flex-col items-center w-1/4">
              <div className="flex flex-col items-center mb-2">
                <Image src={item.logo} alt="logo" width={48} height={48} className="object-contain w-full h-full mb-2" />
              </div>
              <div className="text-black text-[15px] font-normal text-center leading-tight">{item.role}</div>
              <div className="text-[#093FB4] text-[14px] font-normal text-center leading-tight mt-1">{item.date}</div>
              <div className="text-zinc-500 text-[13px] font-normal text-center leading-tight">{item.duration}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
