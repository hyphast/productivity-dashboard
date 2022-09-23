import React, { FC } from 'react'
import styles from './Search.module.scss'

export const Search: FC = () => {
  return (
    <div className={styles.root}>
      <svg
        className={styles.findIcon}
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
      >
        <path
          d="M11.3417 19.25C16.1512 19.25 20.0501 15.3512 20.0501 10.5417C20.0501 5.7322 16.1512 1.83334 11.3417 1.83334C6.53225 1.83334 2.63339 5.7322 2.63339 10.5417C2.63339 15.3512 6.53225 19.25 11.3417 19.25Z"
          stroke="#787486"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9667 20.1667L19.1334 18.3333"
          stroke="#787486"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        className={styles.search}
        placeholder="Search for anything..."
        type="text"
      />
    </div>
  )
}
