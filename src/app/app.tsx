import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { useModal } from '@/shared/lib/hooks/use-modal'
import { Routing } from '@/pages'
import { ConditionalRender } from '@/shared/ui/conditional-render'
import { Modal } from '@/shared/ui/modal'
import { NewUser } from '@/feature/create-user/ui/new-user'

import './app.scss'

export const App = () => {
  const { isOpen, handleClose } = useModal(true)
  const [isPersist, setIsPersist] = useState(false)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useEffect(() => {
    const storage = localStorage.getItem('user-storage')

    if (!storage) return

    if (JSON.parse(storage)?.state?.user?.name.length) {
      setIsPersist(true)
    }
  }, [])

  return (
    <>
      <ConditionalRender conditions={[isTabletOrMobile]}>
        <h2 className="not-supported">Не поддерживается на мобильных устройствах</h2>
      </ConditionalRender>
      <ConditionalRender conditions={[!isTabletOrMobile]}>
        <div className="delimiters" />
        <div className="wrapper">
          <BrowserRouter>
            <Routing />
            {!isPersist && (
              <Modal isOpen={isOpen} title="Введите ваше имя">
                <NewUser handleClose={handleClose} />
              </Modal>
            )}
          </BrowserRouter>
        </div>
      </ConditionalRender>
    </>
  )
}
