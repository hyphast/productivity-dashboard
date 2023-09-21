import { ReactNode, useRef } from 'react'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import CloseIcon from '@/assets/images/icons/close.svg'
import { useClickOutside } from '@/shared/lib/hooks/use-click-outside'
import { ReactPortal } from './react-portal'

import styles from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  handleClose?: () => void
  className?: string
  title?: string
}

export const Modal = ({ children, isOpen, className, handleClose, title }: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const isClosable = handleClose

  // TODO: Так делать нельзя
  if (isClosable) {
    useClickOutside(modalRef, handleClose)
  }

  return (
    <ReactPortal id="modal-root">
      <CSSTransition in={isOpen} appear timeout={300} unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div className={styles.modal} ref={nodeRef}>
          <div className={cn(styles.modalContent, className)} ref={modalRef}>
            {isClosable && (
              <button type="button" onClick={handleClose} className={styles.closeBtn}>
                <CloseIcon />
              </button>
            )}
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
  handleClose: undefined,
}
