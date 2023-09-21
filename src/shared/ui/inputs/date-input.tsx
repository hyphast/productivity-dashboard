import { useFormContext } from 'react-hook-form'

import { Input } from './input'

type DateInputProps = {
  name: string
  placeholder: string
}

export const DateInput = ({ name, placeholder }: DateInputProps) => {
  const { register } = useFormContext()

  return <Input type="datetime-local" {...register(name)} placeholder={placeholder} />
}
