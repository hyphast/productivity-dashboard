import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUserStore } from '../../../store/useUserStore'
import { INewUserValues } from '../NewUser.types'
import { Input } from '../../common/Input'
import styles from '../NewUser.module.scss'

type NewUserFormProps = {
  handleClose: () => void
}
export const NewUserForm: FC<NewUserFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUserValues>()
  const setName = useUserStore((state) => state.setName)

  const onSubmit: SubmitHandler<INewUserValues> = ({ name }) => {
    setName(name)
    handleClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Введите ваше имя"
        {...register('name', {
          minLength: {
            value: 3,
            message: 'Имя должно быть не меньше 3-x символов',
          },
          required: {
            value: true,
            message: 'Это поле обязательное',
          },
        })}
      />
      {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
      <button className={styles.submit} type="submit">
        Принять
      </button>
    </form>
  )
}
