import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from '../../../assets/img/icons/arrow.svg'
import { avatars, useUserStore } from '../../../store/useUserStore'
import { ReactComponent as LogoutIcon } from '../../../assets/img/icons/logout.svg'
import styles from './UserInfo.module.scss'
import { useClickOutside } from '../../../hooks/useClickOutside'

export const UserInfo = () => {
  const name = useUserStore((state) => state.user.name)
  const avatarIdx = useUserStore((state) => state.user.avatar)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const closeDropdown = useCallback(() => {
    setIsDropdownVisible(false)
  }, [])

  useClickOutside(dropdownRef, closeDropdown)

  const onLogoutClick = useCallback(() => {
    localStorage.removeItem('user-storage')
    window.location.reload()
  }, [])

  const onArrowClick = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation()
    setIsDropdownVisible((prev) => !prev)
  }

  return (
    <div className={styles.root}>
      <span className={styles.name}>{name}</span>
      <span className={styles.from}>Developer</span>
      <img className={styles.avatar} src={avatars[avatarIdx]} alt="avatar" />
      <ArrowIcon onClick={onArrowClick} className={styles.arrow} />
      <div
        ref={dropdownRef}
        className={cn(
          { [styles.dropdownHidden]: !isDropdownVisible },
          styles.dropdown
        )}
      >
        <button type="button" onClick={onLogoutClick}>
          Logout
          <LogoutIcon />
        </button>
      </div>
    </div>
  )
}
