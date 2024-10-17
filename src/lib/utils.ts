import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getInitials(str: string | null | undefined): string {
    if (str == null) {
        return "PI"
    }

    const words = str.trim().split(" ");

    if (words.length >= 2) {
        const firstLetter1 = words[0][0];
        const firstLetter2 = words[1][0];

        return (firstLetter1 + firstLetter2).toUpperCase();
    } else {
        return words[0].slice(0, 2).toUpperCase();
    }
}