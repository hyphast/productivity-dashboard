import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

export const AvatarLoader: FC = () => (
  <ContentLoader
    speed={2}
    width={45}
    height={58}
    viewBox="0 0 45 58"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="11" y="67" rx="0" ry="0" width="142" height="39" />
    <circle cx="21" cy="20" r="19" />
    <rect x="3" y="44" rx="3" ry="3" width="35" height="10" />
  </ContentLoader>
)
