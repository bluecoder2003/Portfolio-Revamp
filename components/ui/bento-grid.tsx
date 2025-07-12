import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-[10px] md:grid-cols-3 w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  date,
  image,
}: {
  className?: string;
  title?: string | React.ReactNode;
  date?: string | React.ReactNode;
  image?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-[16px] h-[455px] bg-[#F5F5F5]",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="w-full h-full">
        <Image src={image} alt={title} width={100} height={100} />
      </div>
    </div>
  );
};
