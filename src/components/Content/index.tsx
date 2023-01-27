import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  child,
  get,
  off,
  onDisconnect,
  onValue,
  push,
  ref,
  set,
  ThenableReference,
} from 'firebase/database'
import { ProjectInfo } from './ProjectInfo'
import { Todos } from './Todos'
import { db } from '../../firebase'
import { useUserStore } from '../../store/useUserStore'
import styles from './Content.module.scss'
import { ProjectError } from '../ProjectNotFound'

export const Content: FC = () => {
  const { id } = useParams()
  const userId = useUserStore((state) => state.user.id)
  const addProject = useUserStore((state) => state.addProject)
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (id) {
      get(child(ref(db), `projects/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            addProject(id, snapshot.val().name)
          } else {
            console.log('No data available')
            setErr(true)
          }
        })
        .catch((error) => {
          console.error(error)
          setErr(true)
        })
    }
  }, [id])

  useEffect(() => {
    if (err) return
    const myConnectionsRef = ref(db, `projects/${id}/connections`)
    const connectedRef = ref(db, '.info/connected')
    let con: ThenableReference | undefined
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        con = push(myConnectionsRef)
        // prevIdRef.current = con

        onDisconnect(con).remove()

        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        set(con, userId)
      }
    })
    // eslint-disable-next-line consistent-return
    return () => {
      if (con) {
        set(con, null)
      }
      off(connectedRef)
    }
  }, [id])

  if (!id) {
    return <ProjectError message="Проект не выбран" />
  }

  if (err) {
    return <ProjectError message="Такого проекта не существует" />
  }

  return (
    <div className={styles.root}>
      <div className={styles.projectInfo}>
        <ProjectInfo projectId={id} />
      </div>
      <div className={styles.todos}>
        <Todos />
      </div>
    </div>
  )
}
