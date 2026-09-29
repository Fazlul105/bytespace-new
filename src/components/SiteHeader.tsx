import { useId, useRef, useState } from 'react'
import Brand from './Brand'
import Icon from './Icon'
import './SiteHeader.css'

const links = [
  ['Home', '/'],
  ['Courses', '/search'],
  ['Creators', '/creators/purepearl-studio'],
] as const

export default function SiteHeader({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  return (
    <header
      className={`header container site-header ${light ? 'site-header-light' : 'site-header-dark'}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <Brand light={light} />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a href="/login">Sign In</a>
        <a href="/signup">Join Us</a>
        <a href="/courses/digital-assets/lessons" aria-label="Your courses">
          <Icon name="bag" />
        </a>
      </div>
      <button
        ref={toggle}
        className="mobile-menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls={menuId}
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      {open && (
        <nav className="mobile-nav" id={menuId} aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/login">Sign In</a>
          <a href="/signup">Join Us</a>
        </nav>
      )}
    </header>
  )
}
