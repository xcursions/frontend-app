const MaskString = (str: string) => {
  if (str.length <= 8) {
    return str;
  }
  const visibleDigits = 4;
  const maskedLength = 3;
  const firstPart = str.substring(0, visibleDigits);
  const maskedPart = "*".repeat(maskedLength);
  const lastPart = str.substring(str.length - visibleDigits);
  return `${firstPart}${maskedPart}${lastPart}`;
};

export default MaskString;
