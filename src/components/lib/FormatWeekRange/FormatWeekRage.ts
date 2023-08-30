const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

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

export const formatWeeksRange = (
  startDateString: string | number | Date,
  endDateString: string | number | Date
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  // @ts-ignore
  const timeDifference = endDate - startDate;

  // Calculate the number of weeks in the duration
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
  const numberOfWeeks = timeDifference / millisecondsInAWeek;
  return numberOfWeeks;
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
