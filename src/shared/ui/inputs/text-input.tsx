import { useFormContext } from 'react-hook-form'

import { Input } from './input'

type TextInputProps = {
  name: string
  placeholder: string
  className?: string
}

export const TextInput = ({ name, className, placeholder }: TextInputProps) => {
  const { register } = useFormContext()

  console.log({ register })

  return <Input className={className} type="text" {...register(name)} placeholder={placeholder} />
}

TextInput.defaultProps = {
  className: '',
}
