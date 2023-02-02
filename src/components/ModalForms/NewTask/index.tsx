import React, { FC } from 'react'
import cn from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../common/Input/Input'
import { Textarea } from '../../common/Input/Textarea'
import { INewTaskValues } from './NewTask.types'
import { useTaskDatabase } from './useTaskDatabase'
import modalStyles from '../ModalForms.module.scss'
import styles from './NewTask.module.scss'

const required = {
  value: true,
  message: 'Это поле обязательное',
}

const titleConstraints = {
  maxLength: {
    value: 50,
    message: 'Заголовок должно быть не больше 50 символов',
  },
  required,
}

const descConstraints = {
  required,
}

type NewTaskFormProps = {
  handleClose: () => void
}
export const NewTask: FC<NewTaskFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewTaskValues>()
  const [createTask] = useTaskDatabase()

  const onSubmit: SubmitHandler<INewTaskValues> = (data) => {
    createTask(data)
    handleClose()
  }

  return (
    <form className={modalStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.priority}>
        <div className={styles.low}>
          <input
            type="radio"
            id="low"
            value={0}
            {...register('priority')}
            defaultChecked
          />
          <label htmlFor="low">Low</label>
        </div>
        <div className={styles.high}>
          <input type="radio" id="high" value={1} {...register('priority')} />
          <label htmlFor="high">High</label>
        </div>
        <div className={styles.completed}>
          <input
            type="radio"
            id="completed"
            value={2}
            {...register('priority')}
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
      <Input placeholder="Заголовок" {...register('title', titleConstraints)} />
      {errors.title && (
        <p className={styles.errorMsg}>{errors.title.message}</p>
      )}
      <Input placeholder="Дата" type="datetime-local" {...register('date')} />
      <Textarea placeholder="Описание" {...register('desc', descConstraints)} />
      {errors.desc && (
        <p className={cn(styles.errorMsg, styles.descInputError)}>
          {errors.desc.message}
        </p>
      )}
      <button className={modalStyles.submit} type="submit">
        Принять
      </button>
    </form>
  )
}
