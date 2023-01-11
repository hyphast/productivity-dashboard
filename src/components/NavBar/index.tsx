import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectItem } from './ProjectItem'
import { IndicatorColorEnum } from '../ColoredCircle'
import { useProject } from './hooks/useProject'
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg'
import { useList } from '../../hooks/useList'
import styles from './NavBar.module.scss'
import { projectsRef } from '../../firebase'

const myProjects = [
  {
    id: 1,
    name: 'Mobile App',
    indicatorColor: IndicatorColorEnum.green,
  },
]

//TODO перенести в useProject
function randIndicator() {
  const enumValues = Object.values(IndicatorColorEnum)
  const index = Math.floor(Math.random() * enumValues.length)

  return enumValues[index]
}

export const NavBar: FC = () => {
  const { id } = useParams()
  const [snapshots, loading, error] = useList(projectsRef)
  const navigate = useNavigate()
  const [createProject] = useProject()

  const onNewProject = () => {
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
        {error && <strong>{error.toString()}</strong>}
        {loading && <span>Loading...</span>}
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
          {!loading &&
            snapshots &&
            snapshots.map((v, index) => (
              <li key={v.key}>
                <button
                  type="button"
                  onClick={() => onProjectClick(index, v.key)}
                >
                  <ProjectItem
                    name={v.val().name}
                    indicatorColor={randIndicator()}
                    active={id === v.key}
                  />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}
