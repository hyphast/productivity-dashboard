import React from 'react'
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import { NavBar } from '../components'
import App from '../App'

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
