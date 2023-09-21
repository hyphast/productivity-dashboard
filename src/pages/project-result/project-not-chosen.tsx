import styles from './project-result.module.scss'

export const ProjectNotChosen = () => {
  return (
    <div className={styles.root}>
      <span className={styles.smile}>&#128564;</span>
      <h1>Проект не выбран</h1>
      <p>Выбери проект или создай новый</p>
    </div>
  )
}
