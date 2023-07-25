const formatDate = (dateString: any) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateString);
  const dayOfMonth = date.getDate(); // Renamed 'day' to 'dayOfMonth' to avoid shadowing

  // Function to get the day suffix (e.g., "1st", "2nd", "3rd", "4th", etc.)
  const getDaySuffix = (day: any) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${dayOfMonth}${getDaySuffix(
    dayOfMonth
  )} of ${month} ${year}`;
  return formattedDate;
};

export const SubtractDate = (
  startDateString: string | number | Date,
  deadline: number
) => {
  const startDate = new Date(startDateString);
  startDate.setDate(startDate.getDate() - deadline);
  const newDate = startDate.toLocaleDateString("en-GB");
  const result = formatDate(newDate);
  return result;
};
