import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewUser } from './components/NewUser'
import { Modal } from './components/common/Modal'
import { Main } from './layout/Main'
import { useModal } from './hooks/useModal'
import { Content } from './components/Content'
import './App.scss'

const App: FC = () => {
  const { isOpen, handleClose } = useModal(true)
  const [isPersist, setIsPersist] = useState(false)

  useEffect(() => {
    const storage = localStorage.getItem('user-storage')
    if (!storage) return
    if (JSON.parse(storage)?.state?.user?.name.length) {
      setIsPersist(true)
    }
  }, [])

  return (
    <div className="delimiters">
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path=":id" element={<Content />} />
            </Route>
          </Routes>
          {!isPersist && (
            <Modal
              handleClose={handleClose}
              isOpen={isOpen}
              title="Введите ваше имя"
            >
              <NewUser handleClose={handleClose} />
            </Modal>
          )}
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
