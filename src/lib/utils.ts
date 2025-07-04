import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const singularOrPlural = (
  count: number,
  singular: string,
  plural: string
) => {
  console.log(
    `Count: ${count === 1}, Singular: ${singular}, Plural: ${plural}`
  );
  return parseInt(`${count}`, 10) === 1
    ? `${count} ${singular}`
    : `${count} ${plural}`;
};
