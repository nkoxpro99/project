import 'react-quill/dist/quill.snow.css';

import ReactQuill from 'react-quill';

export const RichTextEditor = ({ field, form, ...props }: any) => {
    return (
      <>
        <ReactQuill
          {...field}
          {...props}
          onBlur={(e) => form.setFieldTouched('description', true)}
          onChange={(v) => {
            form.setFieldValue('description', v);
          }}
        />
      </>
    );
  };