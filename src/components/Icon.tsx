import type { ReactNode } from 'react'
export type IconName =
  | 'search'
  | 'bag'
  | 'menu'
  | 'close'
  | 'star'
  | 'bars'
  | 'design'
  | 'development'
  | 'laptop'
  | 'business'
  | 'marketing'
  | 'camera'
  | 'check'
const paths: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M9 8V5a3 3 0 0 1 6 0v3" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  star: (
    <path
      d="m12 2 3 6.3 7 .9-5.1 4.8 1.3 7-6.2-3.4L5.8 21l1.3-7L2 9.2l7-.9L12 2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  bars: <path d="M5 15v6M12 10v11M19 4v17" strokeWidth="4" />,
  design: (
    <>
      <path d="m4 3 17 17-3 3L1 6l3-3ZM16 3l5 5-9 9-5-5 9-9ZM14 5l5 5M4 16l4 4-6 2 2-6Z" />
    </>
  ),
  development: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="m10 7-3 3 3 3m4-6 3 3-3 3M10 18h4" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="3" width="16" height="13" rx="1" />
      <path d="m4 16-2 5h20l-2-5M9 18h6" />
    </>
  ),
  business: (
    <path d="M4 22V3h10v19M14 8h6v14M7 7h4M7 11h4M7 15h4M7 19h4M16 12h2M16 16h2M2 22h20" />
  ),
  marketing: (
    <path d="m4 10 13-6v14L4 13v-3ZM7 14l2 7h4l-3-6M20 7l2-2M20 12h3M20 17l2 2" />
  ),
  camera: (
    <>
      <rect x="3" y="6" width="18" height="15" rx="2" />
      <path d="M8 6V3h8v3" />
      <circle cx="12" cy="13" r="3" />
      <path d="M8 19h8" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
}
export default function Icon({
  name,
  className = '',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
