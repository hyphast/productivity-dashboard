import React, { FC, useState } from 'react'
import { IndicatorColorEnum, ProjectItem } from './ProjectItem'
import styles from './NavBar.module.scss'

const myProjects = [
  {
    id: 1,
    name: 'Mobile App',
    indicatorColor: IndicatorColorEnum.green,
  },
  {
    id: 2,
    name: 'Test Project',
    indicatorColor: IndicatorColorEnum.orange,
  },
  {
    id: 3,
    name: 'Vanilla JS',
    indicatorColor: IndicatorColorEnum.purple,
  },
  {
    id: 4,
    name: 'React App',
    indicatorColor: IndicatorColorEnum.blue,
  },
]

export const NavBar: FC = () => {
  const [project, setProject] = useState(0)
  return (
    <nav className={styles.root}>
      <div className={styles.myProjectsHeader}>
        <h4>My projects</h4>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33334 8H10.6667"
            stroke="#787486"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.6667V5.33333"
            stroke="#787486"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.00001 14.6667H10C13.3333 14.6667 14.6667 13.3333 14.6667 10V6C14.6667 2.66667 13.3333 1.33333 10 1.33333H6.00001C2.66668 1.33333 1.33334 2.66667 1.33334 6V10C1.33334 13.3333 2.66668 14.6667 6.00001 14.6667Z"
            stroke="#787486"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.projectsContainer}>
        {myProjects.map((proj, index) => (
          <button key={proj.id} type="button" onClick={() => setProject(index)}>
            <ProjectItem
              name={proj.name}
              indicatorColor={proj.indicatorColor}
              active={index === project}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}
