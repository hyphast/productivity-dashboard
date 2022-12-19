import React from 'react'
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import App from '../App'
import { NavBar } from '../components/NavBar'
import { NewTask } from '../components/NewTask'

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/NavBar">
        <NavBar />
      </ComponentPreview>
      <ComponentPreview path="/NewTask">
        <NewTask />
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
