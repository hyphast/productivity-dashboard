import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ReactPortalProps = {
  children: ReactNode
  id: string
}

export const ReactPortal = ({ children, id }: ReactPortalProps) => {
  return createPortal(children, document.getElementById(id) as HTMLElement)
}
