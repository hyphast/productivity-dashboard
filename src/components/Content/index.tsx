import React, { FC, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  ThenableReference,
  DatabaseReference,
  off,
  onDisconnect,
  onValue,
  push,
  ref,
  set,
} from 'firebase/database'
import { ProjectInfo } from './ProjectInfo'
import { Todos } from './Todos'
import { db } from '../../firebase'
import { useUserStore } from '../../store/useUserStore'
import styles from './Content.module.scss'

export const Content: FC = () => {
  const { id } = useParams()
  const userId = useUserStore((state) => state.user.id)
  // const prevIdRef = useRef(ThenableReference)

  useEffect(() => {
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
    return () => {
      if (con) {
        set(con, null)
      }
      off(connectedRef)
    }
  }, [id])

  if (!id) {
    return <h1>Проект не выбран</h1>
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
