'use client';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgsrc: string;
  placeholder: string;
  otherClasses: string;
}

export default function LocalSearchbar({
  route,
  iconPosition,
  imgsrc,
  placeholder,
  otherClasses,
}: CustomInputProps) {
  return (
    <div
      className={cn(
        'background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4',
        otherClasses
      )}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgsrc}
          alt="Search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgsrc}
          alt="Search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}
