import React, { FC, PropsWithChildren, useEffect, useRef } from 'react'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { ReactPortal } from './ReactPortal'
import { ReactComponent as CloseSVG } from '../../../assets/img/icons/close.svg'
import { useClickOutside } from '../../../hooks/useClickOutside'
import styles from './Modal.module.scss'

interface IModalProps extends PropsWithChildren {
  isOpen: boolean
  handleClose: () => void
  className?: string
  title?: string
}
export const Modal: FC<IModalProps> = ({
  children,
  isOpen,
  className,
  handleClose,
  title,
}) => {
  const nodeRef = useRef(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, handleClose)

  return (
    <ReactPortal id="modal-root">
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className={styles.modal} ref={nodeRef}>
          <div className={cn(styles.modalContent, className)} ref={modalRef}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.closeBtn}
            >
              <CloseSVG />
            </button>
            <h4 className={styles.title}>{title}</h4>
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  )
}

Modal.defaultProps = {
  title: '',
  className: '',
}
