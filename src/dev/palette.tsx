import React from 'react'
import { Category, Component, Variant, Palette } from '@react-buddy/ide-toolbox'

export const PaletteTree = () => (
  <Palette>
    <Category name="HTML">
      <Component name="a">
        <Variant requiredParams={['href']}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>Link</a>
        </Variant>
      </Component>
      <Component name="button">
        <Variant>
          {/* eslint-disable-next-line react/button-has-type */}
          <button>Button</button>
        </Variant>
      </Component>
    </Category>
  </Palette>
)
