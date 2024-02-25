export function standardDate(date: string | number | Date) {
  if (date) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }
  return null;
}

export function formatTimeWithTimeZone(
  date: Date,
  timezoneAbbreviation: string
): string {
  const formattedTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedTime} ${timezoneAbbreviation}`;
}
