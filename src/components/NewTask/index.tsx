import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { push, ref, set } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { Input } from '../common/Input'
import { INewTaskValues } from './NewTask.types'
import { db } from '../../firebase'
import styles from '../NewUser/NewUser.module.scss'
import { useUserStore } from '../../store/useUserStore'

type NewTaskFormProps = {
  handleClose: () => void
}
export const NewTask: FC<NewTaskFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewTaskValues>()
  const userId = useUserStore((state) => state.user.id)
  const { id } = useParams()

  const onSubmit: SubmitHandler<INewTaskValues> = (data) => {
    set(push(ref(db, `projects/${id}/todos`)), {
      stage: 0,
      priority: Number(data.priority),
      title: data.title,
      // date: data.date,
      desc: data.desc,
      owner: userId,
    }) //TODO убрать
    handleClose()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.priority}>
        <label htmlFor="low">
          <input type="radio" id="low" value={0} {...register('priority')} />
          Low
        </label>
        <label htmlFor="high">
          <input type="radio" id="high" value={1} {...register('priority')} />
          High
        </label>
        <label htmlFor="completed">
          <input
            type="radio"
            id="completed"
            value={2}
            {...register('priority')}
          />
          Completed
        </label>
      </div>
      {/*<Input placeholder="Приоритет" {...register('priority')} />*/}
      <Input placeholder="Заголовок" {...register('title')} />
      {/*<Input placeholder="Дата" {...register('date')} />*/}
      <Input placeholder="Описание" {...register('desc')} />
      <button className={styles.submit} type="submit">
        Принять
      </button>
    </form>
  )
}
