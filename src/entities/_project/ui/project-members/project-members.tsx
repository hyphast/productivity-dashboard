import { useCallback, useMemo } from 'react'
import { ref } from 'firebase/database'
import { useLocation } from 'react-router-dom'
import { useList } from '@/shared/lib/react-firebase-hooks/use-list'

import { db } from '@/shared/config/firebase'
import { UserAvatar } from '@/shared/ui/user-avatar/user-avatar'
import { AvatarLoader } from '@/shared/ui/loaders/avatar-loader'

import styles from './project-members.module.scss'

type ProjectMembersProps = {
  projectId: string
}

export const ProjectMembers = ({ projectId }: ProjectMembersProps) => {
  const location = useLocation()
  const [snapshots, loading] = useList(ref(db, `projects/${projectId}/connections`))

  const inviteLink = process.env.REACT_APP_URL + location.pathname

  const onInviteClick = useCallback(() => {
    navigator.clipboard.writeText(inviteLink)
  }, [location])

  const connected = useMemo(() => (snapshots ? snapshots.length : 0), [snapshots])

  return (
    <div className={styles.root}>
      <div className={styles.membersContainer}>
        <div className={styles.members}>
          <div className={styles.membersAmount}>Connected: {connected}</div>
          {loading
            ? [...new Array(2)].map((_, i) => <AvatarLoader key={i} />)
            : snapshots && snapshots.map((v) => <UserAvatar className={styles.avatar} key={v.key} userId={v.val()} />)}
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
