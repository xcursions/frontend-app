export default interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}
