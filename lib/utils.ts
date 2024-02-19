import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatTitle = (title: string) => {
    return `BlogDev - ${title}`;
};

export const createSearchParams = (obj: any) => {
    const params = new URLSearchParams(obj).toString();
    return params;
};
