import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { push, ref, set } from 'firebase/database'
import { avatars, useUserStore } from '../../store/useUserStore'
import { INewUserValues } from './NewUser.types'
import { Input } from '../common/Input'
import { db } from '../../firebase'
import styles from './NewUser.module.scss'

type NewUserFormProps = {
  handleClose: () => void
}
export const NewUser: FC<NewUserFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUserValues>()
  const setUser = useUserStore((state) => state.setUser)

  const onSubmit: SubmitHandler<INewUserValues> = ({ name }) => {
    //TODO refactor
    const setUserData = async () => {
      const pRef = await push(ref(db, 'users'))
      if (!pRef.key) return
      const avatarIdx = Math.floor(Math.random() * (avatars.length - 1) + 1)
      set(pRef, { name, avatar: avatarIdx })
      setUser(pRef.key, name, avatarIdx)
      handleClose()
    }
    setUserData()
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
