/**
 * A function that takes in seconds as a parameter and returns it as minutes and seconds.
 * @param time - This is a value in seconds passed into the function
 * @returns the function returns the remaining minutes and seconds
 */

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
