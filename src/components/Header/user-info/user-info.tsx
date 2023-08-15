import { useCallback, useRef } from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/use-user-store'
import ArrowIcon from '@/assets/images/icons/arrow.svg'
import LogoutIcon from '@/assets/images/icons/logout.svg'
import { useDropdown } from './hooks/use-dropdown'
import { useAvatar } from './hooks/use-avatar'
import styles from './user-info.module.scss'

export const UserInfo = () => {
  const name = useUserStore((state) => state.user.name)
  const [avatar] = useAvatar()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownVisible, { toggleDropdown: onArrowClick }] = useDropdown(dropdownRef)
  const navigate = useNavigate()

  const onLogoutClick = useCallback(() => {
    localStorage.removeItem('user-storage')
    navigate('/')
    window.location.reload()
  }, [])

  return (
    <div className={styles.root}>
      <span className={styles.name}>{name}</span>
      <span className={styles.from}>Developer</span>
      <img className={styles.avatar} src={avatar} alt="avatar" />
      <button type="button" onClick={onArrowClick} className={styles.arrow}>
        <ArrowIcon />
      </button>
      {/* <CSSTransition */}
      {/*  in={isDropdownVisible} */}
      {/*  appear */}
      {/*  timeout={300} */}
      {/*  unmountOnExit */}
      {/*  classNames="dropdown" */}
      {/*  nodeRef={dropdownRef} */}
      {/* > */}
      <div ref={dropdownRef} className={cn({ [styles.dropdownHidden]: !isDropdownVisible }, styles.dropdown)}>
        <button type="button" onClick={onLogoutClick}>
          Logout
          <LogoutIcon />
        </button>
      </div>
      {/* </CSSTransition> */}
    </div>
  )
}
