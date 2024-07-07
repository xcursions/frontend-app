const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  // const year = date.getFullYear();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${day}${daySuffix} ${month}`;
};

export const formatDatesRange = (
  startDateString: string | number | Date,
  endDateString: string | number | Date
) => {
  const startDate = formatDate(startDateString);
  const endDate = formatDate(endDateString);

  return `${startDate} - ${endDate}`;
};

// export const formatWeeksRange = (
//   startDateString: string | number | Date,
//   endDateString: string | number | Date
// ) => {
//   const startDate = new Date(startDateString);
//   const endDate = new Date(endDateString);
//   // @ts-ignore
//   const timeDifference = endDate - startDate;

//   // Calculate the number of weeks in the duration
//   const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
//   const numberOfWeeks = timeDifference / millisecondsInAWeek;
//   return numberOfWeeks;
// };

export const formatWeeksRange = (
  startDateString: string | number | Date,
  endDateString: string | number | Date
): string => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const timeDifference = endDate.getTime() - startDate.getTime(); // Difference in milliseconds

  // Calculate the number of weeks and remaining days
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
  const numberOfWeeks = Math.floor(timeDifference / millisecondsInAWeek);
  const remainingDays = Math.ceil(
    (timeDifference % millisecondsInAWeek) / (24 * 60 * 60 * 1000)
  );

  // Format the result based on the number of weeks and remaining days
  if (numberOfWeeks === 0) {
    return `${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
  }
  if (numberOfWeeks === 1 && remainingDays === 0) {
    return "1 week";
  }
  if (numberOfWeeks === 1 && remainingDays > 0) {
    return `1 week and ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
  }
  return `${numberOfWeeks} weeks and ${remainingDays} day${
    remainingDays !== 1 ? "s" : ""
  }`;
};

export function formatedDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${day}${daySuffix} ${month}, ${year}`;
}

export function formatTimeInWAT(dateString: string | number | Date) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Format the time to 12-hour clock format
  const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
  const minutes = date.getMinutes();
  const period = date.getHours() >= 12 ? "pm" : "am"; // Determine AM or PM

  // Get the timezone abbreviation (WAT - West Africa Time)
  const timezoneAbbr = "WAT";

  // Construct the formatted time string
  const formattedTime = `${hours}:${
    (minutes < 10 ? "0" : "") + minutes
  }${period} ${timezoneAbbr}`;

  return formattedTime;
}
