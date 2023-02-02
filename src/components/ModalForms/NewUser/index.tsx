import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { INewUserValues } from './NewUser.types'
import { Input } from '../../common/Input/Input'
import { useUserDatabase } from './useUserDatabase'
import newUserStyles from './NewUser.module.scss'
import styles from '../ModalForms.module.scss'

const nameConstraints = {
  minLength: {
    value: 3,
    message: 'Имя должно быть не меньше 3-x символов',
  },
  required: {
    value: true,
    message: 'Это поле обязательное',
  },
}

type NewUserFormProps = {
  handleClose: () => void
}
export const NewUser: FC<NewUserFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUserValues>()
  const [createUser] = useUserDatabase()

  const onSubmit: SubmitHandler<INewUserValues> = ({ name }) => {
    createUser(name)
    handleClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={newUserStyles.root}
        placeholder="Введите ваше имя"
        {...register('name', nameConstraints)}
      />
      {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
      <button className={styles.submit} type="submit">
        Принять
      </button>
    </form>
  )
}
