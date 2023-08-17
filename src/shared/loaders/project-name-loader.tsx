import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

export const ProjectNameLoader: FC = () => (
  <ContentLoader
    speed={2}
    width={269}
    height={60}
    viewBox="0 0 269 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="11" y="67" rx="0" ry="0" width="142" height="39" />
    <rect x="0" y="4" rx="10" ry="10" width="270" height="56" />
  </ContentLoader>
)
