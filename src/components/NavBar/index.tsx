import React, { FC, MouseEvent, useEffect, useState } from 'react'
import { ProjectItem } from './ProjectItem'
import { IndicatorColorEnum } from '../common/ColoredCircle'
import { useProject } from './hooks/useProject'
import { ReactComponent as PlusIcon } from '../../assets/img/plusIcon.svg'
import styles from './NavBar.module.scss'

const myProjects = [
  {
    id: 1,
    name: 'Mobile App',
    indicatorColor: IndicatorColorEnum.green,
  },
]

export const NavBar: FC = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [createProject] = useProject()

  const onProjectClick = () => {
    createProject()
  }

  return (
    <nav className={styles.root}>
      <div className={styles.myProjectsHeader}>
        <h4>My projects</h4>
        <PlusIcon onClick={onProjectClick} />
      </div>
      <div className={styles.projectsContainer}>
        {myProjects.map((proj, index) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => setActiveProject(index)}
          >
            <ProjectItem
              name={proj.name}
              indicatorColor={proj.indicatorColor}
              active={index === activeProject}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}
