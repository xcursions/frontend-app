const match = (
  option: string | number,
  options: {
    default: string | number;
    [key: string]: string | number | undefined;
  }
) => {
  return options[option] || options.default;
};

export default match;
