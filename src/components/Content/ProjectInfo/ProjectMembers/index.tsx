import React, { FC, useCallback, useMemo } from 'react'
import { ref } from 'firebase/database'
import { useLocation } from 'react-router-dom'
import { db } from '../../../../firebase'
import { useList } from '../../../../hooks/useList'
import { Avatar } from '../../../Avatar'
import { AvatarLoader } from '../../../Loaders/AvatarLoader'
import styles from './ProjectMembers.module.scss'

type ProjectMembersProps = {
  projectId: string
}
export const ProjectMembers: FC<ProjectMembersProps> = ({ projectId }) => {
  const location = useLocation()
  const [snapshots, loading] = useList(
    ref(db, `projects/${projectId}/connections`)
  )

  const inviteLink = process.env.REACT_APP_URL + location.pathname

  const onInviteClick = useCallback(() => {
    navigator.clipboard.writeText(inviteLink)
  }, [location])

  const connected = useMemo(
    () => (snapshots ? snapshots.length : 0),
    [snapshots]
  )

  return (
    <div className={styles.root}>
      <div className={styles.membersContainer}>
        <div className={styles.members}>
          <div className={styles.membersAmount}>Connected: {connected}</div>
          {loading
            ? [...new Array(2)].map((_, i) => <AvatarLoader key={i} />)
            : snapshots &&
              snapshots.map((v) => (
                <Avatar
                  className={styles.avatar}
                  key={v.key}
                  userId={v.val()}
                />
              ))}
        </div>
      </div>
      <div className={styles.afterMembers}>
        <div className={styles.inviteLink}>
          <input type="text" value={inviteLink} disabled />
          <button type="button" onClick={onInviteClick}>
            Copy Invite Link
          </button>
        </div>
      </div>
    </div>
  )
}
