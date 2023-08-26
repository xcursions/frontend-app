import type { ActionMeta, MultiValue } from "react-select";

import type { Option } from "./MultiSelectConfig";

export default interface MultiSelectProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  containerClass?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  onFocus?: () => void;
  value?:
    | {
        value: string;
        label: string;
      }
    | {
        value: string;
        label: string;
      }[]
    | MultiValue<Option>;
}
