import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TextInput } from '@/shared/ui/inputs/text-input'
import { INewUserValues } from '../../new-user.types'
import { useUserDatabase } from '../../model/use-user-database'
import newUserStyles from './new-user.module.scss'

import styles from '../modal-forms.module.scss'

const newUserSchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Имя должно быть не меньше 3-x символов')
      .max(15, 'Имя должно быть не больше 15 символов')
      .required(),
  })
  .required('Это поле обязательное')

type NewUserFormProps = {
  handleClose: () => void
}

export const NewUser = ({ handleClose }: NewUserFormProps) => {
  const methods = useForm<INewUserValues>({
    resolver: yupResolver(newUserSchema),
    defaultValues: {
      name: '',
    },
  })
  const [createUser] = useUserDatabase()

  const { errors } = methods.formState

  const onSubmit: SubmitHandler<INewUserValues> = ({ name }) => {
    createUser(name)
    handleClose()
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput className={newUserStyles.root} name="name" placeholder="Введите ваше имя" />
        {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>} // TODO: Сделать компонент с ошибкой
        <button className={styles.submit} type="submit">
          Принять
        </button>
      </form>
    </FormProvider>
  )
}
