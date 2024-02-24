/* eslint-disable no-plusplus */
export { generateInitialsImageURI } from "./generateInitials";
export { default as matchClassName } from "./match";
export * from "./remainingTime";
export * from "./vowelChecker";

export const getLocationFrom = () => {
  const { pathname } = window.location;
  const searchParams = window.location.search;
  return encodeURIComponent(`${pathname}${searchParams}`);
};

/**
 * Regular expression to check if the string starts with "http://" or "https://"
 *
 * @param {string} url
 * @returns
 */
export const ensureHttpsVal = (url: string) => {
  const startsWithHttpRegex = /^https?:\/\//i;
  const fullUrlRegex = /^(https?:\/\/)?([^\s/$.?#].[^\s]*[^\s/.])$/i;
  if (!fullUrlRegex.test(url)) return url;

  // Check if the URL starts with "http://" or "https://"
  if (!startsWithHttpRegex.test(url)) {
    // If not, append "https://"
    return `https://${url}`;
  }

  // If it starts with "http://" or "https://", return the original URL
  return url;
};

/**
 *
 * @returns random id of less than 6digits
 */
export const uuid = () => Math.random().toString(36).slice(2, 7);

function isValidDate(date: any): date is Date {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

export const getDatesInRange = (
  date: Date,
  forwardYears: number,
  backwardYears: number
): number[] => {
  // Validate input date
  if (!date || !isValidDate(date)) {
    throw new Error("Invalid date provided. Please input a valid Date object.");
  }

  // Create empty array to store dates
  const dates: Date[] = [];

  // Clone the date object to avoid modifying the original
  const currentDate = new Date(date);

  // Increment days for forward period
  for (let i = 0; i <= forwardYears * 365; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Subtract days to go back in time
  currentDate.setDate(
    currentDate.getDate() - (forwardYears * 365 + backwardYears * 365)
  );

  // Add dates for past period
  for (let i = 0; i <= backwardYears * 365; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const years = Array.from(
    { length: forwardYears + backwardYears + 1 },
    (_, i) => {
      const offset = i - Math.floor(forwardYears / 2);
      const targetDate = new Date(date.getFullYear() + offset, 0, 1);
      return targetDate.getFullYear();
    }
  ).filter((year, index, arr) => arr.indexOf(year) === index);

  return years;
};
