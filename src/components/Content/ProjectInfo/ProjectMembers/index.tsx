import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { ref } from 'firebase/database'
import { useLocation } from 'react-router-dom'
import { ReactComponent as AddSVG } from '../../../../assets/img/icons/add.svg'
import { ReactComponent as PeopleSVG } from '../../../../assets/img/icons/people.svg'
import { ReactComponent as ColumnViewSVG } from '../../../../assets/img/icons/columnView.svg'
import { ReactComponent as GridViewSVG } from '../../../../assets/img/icons/gridView.svg'
import { db } from '../../../../firebase'
import { useList } from '../../../../hooks/useList'
import { Avatar } from '../../../Avatar'
import { AvatarLoader } from '../../../Loaders/AvatarLoader'
import styles from './ProjectMembers.module.scss'

type ProjectMembersProps = {
  projectId: string
}
export const ProjectMembers: FC<ProjectMembersProps> = ({ projectId }) => {
  const [view, setView] = useState(true)
  const location = useLocation()
  const [snapshots, loading] = useList(
    ref(db, `projects/${projectId}/connections`)
  )

  const inviteLink = process.env.REACT_APP_URL + location.pathname

  const onInviteClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      navigator.clipboard.writeText(inviteLink)
    },
    [location]
  )

  return (
    <div className={styles.root}>
      <div className={styles.membersContainer}>
        <div className={styles.inviteLink}>
          <input type="text" value={inviteLink} disabled />
          <button type="button" onClick={onInviteClick}>
            Copy Invite Link
          </button>
        </div>
        <div className={styles.members}>
          {/*{membersList.map((member) => (*/}
          {/*  <img*/}
          {/*    key={member.photoUrl}*/}
          {/*    className={styles.memberItem}*/}
          {/*    src={member.photoUrl}*/}
          {/*    alt="member avatar"*/}
          {/*  />*/}
          {/*))}*/}
          {loading
            ? [...new Array(2)].map((_, i) => <AvatarLoader key={i} />)
            : snapshots &&
              snapshots.map((v) => (
                <Avatar
                  key={v.key}
                  userId={v.val()}
                  // className={styles.memberItem}
                />
              ))}
          {/*<div className={cn(styles.memberItem, styles.restMembers)}>1</div>*/}
        </div>
      </div>
      <div className={styles.afterMembers}>
        <button className={styles.shareBtn} type="button">
          <PeopleSVG />
          Share
        </button>
        <hr className={styles.delimiter} />
        <button
          onClick={() => setView(true)}
          className={cn(styles.view, styles.firstView, {
            [styles.activeView]: view,
          })}
          type="button"
        >
          <ColumnViewSVG />
        </button>
        <button
          onClick={() => setView(false)}
          className={cn(styles.view, { [styles.activeView]: !view })}
          type="button"
        >
          <GridViewSVG />
        </button>
      </div>
    </div>
  )
}
