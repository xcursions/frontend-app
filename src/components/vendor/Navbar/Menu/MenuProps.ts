export default interface MenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setPopperElement: (element: HTMLDivElement | null) => void;
  styles: { [key: string]: React.CSSProperties };
  attributes: {
    [key: string]:
      | {
          [key: string]: string;
        }
      | undefined;
  };
}

export interface MenuItemProps {
  onClose?: () => void;
  url?: string;
  className?: string;
}
