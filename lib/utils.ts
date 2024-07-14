import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) {
    const secondCount = Math.floor(seconds);
    return `${secondCount} ${secondCount === 1 ? 'second' : 'seconds'} ago`;
  } else if (minutes < 60) {
    const minuteCount = Math.floor(minutes);
    return `${minuteCount} ${minuteCount === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    const hourCount = Math.floor(hours);
    return `${hourCount} ${hourCount === 1 ? 'hour' : 'hours'} ago`;
  } else if (days < 7) {
    const dayCount = Math.floor(days);
    return `${dayCount} ${dayCount === 1 ? 'day' : 'days'} ago`;
  } else if (weeks < 4) {
    const weekCount = Math.floor(weeks);
    return `${weekCount} ${weekCount === 1 ? 'week' : 'weeks'} ago`;
  } else if (months < 12) {
    const monthCount = Math.floor(months);
    return `${monthCount} ${monthCount === 1 ? 'month' : 'months'} ago`;
  } else {
    const yearCount = Math.floor(years);
    return `${yearCount} ${yearCount === 1 ? 'year' : 'years'} ago`;
  }
};

export const formatAndDivideNumber = (num: number): string => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + ' K';
  } else if (num > 999999 && num < 1000000000) {
    return (num / 1000000).toFixed(1) + ' M';
  } else if (num > 999999999) {
    return (num / 1000000000).toFixed(1) + ' B';
  }
  return num.toString();
};

export const getJoinedDate = (date: Date): string => {
  // const date = new Date(joinedAt);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${month} ${year}`;
};
