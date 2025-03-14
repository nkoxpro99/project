import { forwardRef } from 'react';
import ReactTextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

export type TextAreaAutoSizeProps = TextareaAutosizeProps & {
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextAreaAutoSize = forwardRef<HTMLTextAreaElement, TextAreaAutoSizeProps>(
  ({ maxRows = 3, minRows = 1, onValueChange, onFocus, onBlur, value, ...props }: TextAreaAutoSizeProps, ref) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;

      onValueChange?.(value);
    };

    return (
      <ReactTextareaAutosize
        ref={ref}
        minRows={minRows}
        value={value}
        onBlur={onBlur}
        onChange={handleOnChange}
        onFocus={onFocus}
        {...props}
      />
    );
  },
);
