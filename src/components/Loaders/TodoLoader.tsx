import React from 'react'
import ContentLoader from 'react-content-loader'

export const TodoLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={159}
      viewBox="0 0 340 159"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="16" y="16" rx="3" ry="3" width="70" height="25" />
      <rect x="292" y="17" rx="3" ry="3" width="20" height="20" />
      <rect x="15" y="59" rx="3" ry="3" width="215" height="22" />
      <rect x="16" y="91" rx="3" ry="3" width="215" height="35" />
      <circle cx="27" cy="146" r="12" />
      <rect x="45" y="137" rx="3" ry="3" width="46" height="17" />
    </ContentLoader>
  )
}
