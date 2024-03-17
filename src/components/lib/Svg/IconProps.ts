export interface IconProps {
  color?: string;
  className?: string;
  active?: boolean;
  variant?: "default" | "type2" | "type3" | "type4" | "type5";
  size?: number | string;
  onClick?: () => void;
}
