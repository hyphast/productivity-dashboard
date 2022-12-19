import React, { FC, useState } from 'react'
import cn from 'classnames'
import { ReactComponent as AddSVG } from '../../../../assets/img/icons/add.svg'
import { ReactComponent as PeopleSVG } from '../../../../assets/img/icons/people.svg'
import { ReactComponent as ColumnViewSVG } from '../../../../assets/img/icons/columnView.svg'
import { ReactComponent as GridViewSVG } from '../../../../assets/img/icons/gridView.svg'
import avatarImg2 from '../../../../assets/img/ava2.jpg'
import avatarImg3 from '../../../../assets/img/ava3.jpg'
import styles from './ProjectMembers.module.scss'

const membersList = [
  {
    photoUrl: avatarImg3,
  },
  {
    photoUrl: avatarImg2,
  },
]

export const ProjectMembers: FC = () => {
  const [view, setView] = useState(true)

  return (
    <div className={styles.root}>
      <div className={styles.membersContainer}>
        <AddSVG />
        <span className={styles.addMember}>Invite</span>
        <div className={styles.members}>
          {membersList.map((member) => (
            <img
              key={member.photoUrl}
              className={styles.memberItem}
              src={member.photoUrl}
              alt="member avatar"
            />
          ))}
          <div className={cn(styles.memberItem, styles.restMembers)}>+2</div>
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
