import React, { FC, MouseEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProjectItem } from './ProjectItem'
import { useProject } from './hooks/useProject'
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg'
import { useUserStore } from '../../store/useUserStore'
import styles from './NavBar.module.scss'

export const NavBar: FC = () => {
  const { id } = useParams()
  const projects = useUserStore((state) => state.projects)
  const navigate = useNavigate()
  const [createProject] = useProject()

  const onNewProject = (event: MouseEvent) => {
    event.stopPropagation()
    createProject()
  }

  const onProjectClick = (index: number, key: string | null) => {
    if (!key) return
    navigate(`/${key}`)
  }

  return (
    <nav className={styles.root}>
      <div className={styles.myProjectsHeader}>
        <h4>My projects</h4>
        <PlusIcon onClick={onNewProject} />
      </div>
      <div className={styles.projectsContainer}>
        {/*{error && <strong>{error.toString()}</strong>}*/}
        {/*{loading && <span>Loading...</span>}*/}
        {/*{myProjects.map((proj, index) => (*/}
        {/*  <button*/}
        {/*    key={proj.id}*/}
        {/*    type="button"*/}
        {/*    onClick={() => setActiveProject(index)}*/}
        {/*  >*/}
        {/*    <ProjectItem*/}
        {/*      name={proj.name}*/}
        {/*      indicatorColor={proj.indicatorColor}*/}
        {/*      active={index === activeProject}*/}
        {/*    />*/}
        {/*  </button>*/}
        {/*))}*/}
        <ul>
          {projects.map((project, index) => (
            <li key={project.id}>
              <button
                type="button"
                className={styles.projectBtn}
                onClick={() => onProjectClick(index, project.id)}
              >
                <ProjectItem
                  name={project.name}
                  indicatorColor={project.indicator}
                  active={id === project.id}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
