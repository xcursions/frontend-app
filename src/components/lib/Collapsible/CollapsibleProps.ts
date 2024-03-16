export default interface CollapsibleProps {
  title: string;
  id: string;
  subtitle?: string;
  open?: boolean;
  openStateHandler?: (id: string) => void;
  children: React.ReactNode;
  wrapperClassName?: string;
}
