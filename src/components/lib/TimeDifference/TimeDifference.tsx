import React, { useEffect, useState } from "react";

function TimeDifference({ createdAt }: any) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    // Calculate the time difference between createdAt and the current date
    const calculateTimeAgo = () => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      // @ts-ignore
      const diffInMilliseconds = now - createdDate;
      const seconds = Math.floor(diffInMilliseconds / 1000);

      if (seconds < 60) {
        setTimeAgo(`${seconds} seconds ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes} minutes ago`);
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours} hours ago`);
      } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        setTimeAgo(`${days} days ago`);
      } else {
        const weeks = Math.floor(seconds / 604800);
        setTimeAgo(`${weeks} weeks ago`);
      }
    };

    // Update the time ago every minute (you can adjust the interval if needed)
    const interval = setInterval(calculateTimeAgo, 60000);

    // Call the function initially to set the initial value
    calculateTimeAgo();

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
}

export default TimeDifference;
