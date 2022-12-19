import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../common/Input'
import { INewTaskValues } from '../NewTask.types'
import styles from '../../NewUser/NewUser.module.scss'

type NewTaskFormProps = {
  handleClose: () => void
}
export const NewTaskForm: FC<NewTaskFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewTaskValues>()

  const onSubmit: SubmitHandler<INewTaskValues> = (data) => {
    console.log('data', data)
    // handleClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Приоритет" {...register('priority')} />
      <Input placeholder="Заголовок" {...register('title')} />
      <Input placeholder="Дата" {...register('date')} />
      <Input placeholder="Описание" {...register('description')} />
      <button className={styles.submit} type="submit">
        Принять
      </button>
    </form>
  )
}
