import { MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PlusIcon from '@/assets/images/icons/plus.svg'
import { useUserStore } from '@/store/use-user-store'
import { ProjectItem } from './project-item'
import { useProjectDatabase } from './use-project-database'
import { Loader } from '../loaders/loader/loader'

import styles from './navbar.module.scss'

export const NavBar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const projects = useUserStore((state) => state.projects)
  const [createProject, loading] = useProjectDatabase()

  const onNewProject = (event: MouseEvent) => {
    event.stopPropagation()
    createProject()
  }

  const onProjectClick = (event: MouseEvent<HTMLButtonElement>, index: number, key: string | null) => {
    event.stopPropagation()
    if (!key) return
    navigate(`/${key}`)
  }

  return (
    <nav className={styles.root}>
      <div className={styles.myProjectsHeader}>
        <h4>My projects</h4>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <button type="button" onClick={onNewProject}>
            <PlusIcon />
          </button>
        )}
      </div>
      <div className={styles.projectsContainer}>
        <ul>
          {projects.map((project, index) => (
            <li key={project.id}>
              <span
                className={styles.projectBtn}
                role="button"
                tabIndex={0}
                onClick={(event: MouseEvent<HTMLButtonElement>) => onProjectClick(event, index, project.id)}
              >
                <ProjectItem
                  id={project.id}
                  name={project.name}
                  indicatorColor={project.indicator}
                  active={id === project.id}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
