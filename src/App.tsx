import React, { FC } from 'react'
import { Main } from './layout/Main'
import './App.scss'

const App: FC = () => {
  return (
    <div className="delimiters">
      <div className="wrapper">
        <Main />
      </div>
    </div>
  )
}

export default App
