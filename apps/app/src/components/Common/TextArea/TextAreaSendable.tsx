import { Controller, useForm } from 'react-hook-form'

import { TextAreaAutoSize, TextAreaAutoSizeProps } from './TextAreaAutoSize'

export type TextAreaSendableProps = TextAreaAutoSizeProps & { onValueSubmit?: (value: string) => void }

export const TextAreaSendable = ({
  name = 'text-area-sendable',
  value,
  onValueChange,
  onValueSubmit,
  onFocus,
  onBlur,
  ...props
}: TextAreaSendableProps) => {
  const { handleSubmit, control } = useForm()

  return (
    <Controller
      control={control}
      defaultValue={value}
      name={name}
      render={({ field: { name, onChange, onBlur: onFieldBlur, value } }) => {
        const onEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (event.key == 'Enter' && event.shiftKey == false) {
            event.preventDefault()
            handleSubmit(
              (data) => {
                onChange('')
                onValueSubmit?.(data[name])
              },
              (errors) => {
                onChange('')
                console.error(errors)
              },
            )()
          }
        }

        const handleChange = (value: string) => {
          onChange(value)
          onValueChange?.(value)
        }

        const handleMessageBlur = () => {
          onFieldBlur()
          onBlur?.()
        }

        const handleMessageFocus = () => {
          onFocus?.()
        }

        return (
          <TextAreaAutoSize
            maxRows={3}
            minRows={1}
            name={name}
            placeholder="Type something"
            value={value}
            onBlur={handleMessageBlur}
            onFocus={handleMessageFocus}
            onKeyDown={onEnterPress}
            onValueChange={handleChange}
            {...props}
          />
        )
      }}
      rules={{
        required: true,
        validate: { whitespace: (value) => (value as string).trim().length !== 0 },
      }}
    />
  )
}
