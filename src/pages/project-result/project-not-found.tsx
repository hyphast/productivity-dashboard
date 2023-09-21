import styles from './project-result.module.scss'

export const ProjectNotFound = () => {
  return (
    <div className={styles.root}>
      <span className={styles.smile}>&#129396;</span>
      <h1>Такого проекта не существует</h1>
      <p>Возможно проект был удален</p>
    </div>
  )
}
