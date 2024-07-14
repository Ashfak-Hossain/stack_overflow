'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

export default function Filter({
  filters,
  otherClasses,
  containerClasses,
}: FilterProps) {
  return (
    <div className={cn('relative', containerClasses)}>
      <Select>
        <SelectTrigger
          className={cn(
            'body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5',
            otherClasses
          )}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="bg-light-800 text-dark-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500"
                >
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
