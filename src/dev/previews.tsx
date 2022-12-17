import React from 'react'
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import App from '../App'
import { NavBar } from '../components/NavBar'

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/NavBar">
        <NavBar />
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
