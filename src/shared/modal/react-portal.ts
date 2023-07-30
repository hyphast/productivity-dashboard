import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface IReactPortalProps extends PropsWithChildren {
  id: string
}
export const ReactPortal: FC<IReactPortalProps> = ({ children, id }) => {
  return createPortal(children, document.getElementById(id) as HTMLElement)
}
