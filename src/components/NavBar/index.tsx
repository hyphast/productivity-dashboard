import React, { FC, MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectItem } from './ProjectItem'
import { useProjectDatabase } from './useProjectDatabase'
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg'
import { useUserStore } from '../../store/useUserStore'
import { Loader } from '../Loaders/Loader/Loader'
import styles from './NavBar.module.scss'

export const NavBar: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const projects = useUserStore((state) => state.projects)
  const [createProject, loading] = useProjectDatabase()

  const onNewProject = (event: MouseEvent) => {
    event.stopPropagation()
    createProject()
  }

  const onProjectClick = (
    event: MouseEvent<HTMLDivElement>,
    index: number,
    key: string | null
  ) => {
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
          <PlusIcon onClick={onNewProject} />
        )}
      </div>
      <div className={styles.projectsContainer}>
        <ul>
          {projects.map((project, index) => (
            <li key={project.id}>
              <div
                className={styles.projectBtn}
                onClick={(event: MouseEvent<HTMLDivElement>) =>
                  onProjectClick(event, index, project.id)
                }
              >
                <ProjectItem
                  name={project.name}
                  indicatorColor={project.indicator}
                  active={id === project.id}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
