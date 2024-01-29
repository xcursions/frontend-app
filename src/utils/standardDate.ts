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
