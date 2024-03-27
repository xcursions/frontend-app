export default interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
  wrapperClassname?: string;
  labelClassname?: string;
  type?: string;
  label?: string;
  name?: string;
  indeterminate?: any;
}
