import cn from 'classnames'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TextInput } from '@/shared/ui/inputs/text-input'
import { INewTaskValues, Priority } from '../../new-task.types'
import { useTaskDatabase } from '../../model/use-task-database'
import { DateInput } from '@/shared/ui/inputs/date-input'

import modalStyles from '../modal-forms.module.scss'

import styles from './new-task.module.scss'
import { Textarea } from '@/shared/ui/inputs'

const newTaskSchema = yup
  .object({
    priority: yup.mixed<Priority>().oneOf(Object.values(Priority)).required(),
    title: yup.string().max(50, 'Заголовок должно быть не больше 50 символов').required(),
    date: yup.string().required(),
    desc: yup.string().required(),
  })
  .required('Это поле обязательное')

type NewTaskFormProps = {
  handleClose: () => void
}

export const NewTask = ({ handleClose }: NewTaskFormProps) => {
  const methods = useForm<INewTaskValues>({
    resolver: yupResolver(newTaskSchema),
    defaultValues: {
      priority: Priority.LOW,
      title: '',
      date: '',
      desc: '',
    },
  })
  const [createTask] = useTaskDatabase()

  const { errors } = methods.formState

  const onSubmit: SubmitHandler<INewTaskValues> = (data) => {
    createTask(data)
    handleClose()
  }

  return (
    <FormProvider {...methods}>
      <form className={modalStyles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.priority}>
          <div className={styles.low}>
            <input type="radio" id="low" value={0} {...methods.register('priority')} defaultChecked />
            <label htmlFor="low">Low</label>
          </div>
          <div className={styles.high}>
            <input type="radio" id="high" value={1} {...methods.register('priority')} />
            <label htmlFor="high">High</label>
          </div>
          <div className={styles.completed}>
            <input type="radio" id="completed" value={2} {...methods.register('priority')} />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        <TextInput name="title" placeholder="Заголовок" />
        {errors.title && <p className={styles.errorMsg}>{errors.title.message}</p>} // TODO: Сделать компонент с ошибкой
        <DateInput name="date" placeholder="Дата" />
        <Textarea name="desc" placeholder="Описание" />
        {errors.desc && <p className={cn(styles.errorMsg, styles.descInputError)}>{errors.desc.message}</p>}
        <button className={modalStyles.submit} type="submit">
          Принять
        </button>
      </form>
    </FormProvider>
  )
}
