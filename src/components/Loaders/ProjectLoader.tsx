import React from 'react'
import ContentLoader from 'react-content-loader'

export const ProjectLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={230}
      height={50}
      viewBox="0 0 230 50"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="2" y="2" rx="10" ry="10" width="225" height="45" />
    </ContentLoader>
  )
}
