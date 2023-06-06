interface CustomProps {
  help?: boolean;
  helperText?: string;
  values: number[] | string[];
  label?: string;
  labelClass?: string;
  title?: string;
  containerClass?: string;
  error?: boolean;
  setValues: (array: string[]) => void;
}

export interface MultipleValuesProps
  extends React.HTMLProps<HTMLInputElement>,
    CustomProps {}
