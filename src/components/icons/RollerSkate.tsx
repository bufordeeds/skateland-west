import React from 'react'

interface RollerSkateProps {
  className?: string
}

export const RollerSkate: React.FC<RollerSkateProps> = ({ className = 'size-6' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Boot */}
      <path d="M6 13V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2l2.5 2.5a1 1 0 0 1 .3.7V13" />
      {/* Boot top cuff */}
      <path d="M6 6.5h8" />
      {/* Boot sole / base plate */}
      <path d="M4 13h14a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V14a1 1 0 0 1 1-1z" />
      {/* Wheels */}
      <circle cx="6.5" cy="19.5" r="2" />
      <circle cx="15.5" cy="19.5" r="2" />
      {/* Wheel trucks / axles */}
      <path d="M6.5 16.5v1" />
      <path d="M15.5 16.5v1" />
      {/* Laces */}
      <path d="M8.5 7.5l3 0" />
      <path d="M8.5 9.5l3 0" />
      <path d="M8.5 11.5l3 0" />
    </svg>
  )
}
