import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from './layout/Main'
import { useModal } from './hooks/useModal'
import { Content, NewUser, Modal } from './components'
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
    <>
      <div className="delimiters" />
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path=":id" element={<Content />} />
            </Route>
          </Routes>
          {!isPersist && (
            <Modal isOpen={isOpen} title="Введите ваше имя">
              <NewUser handleClose={handleClose} />
            </Modal>
          )}
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
