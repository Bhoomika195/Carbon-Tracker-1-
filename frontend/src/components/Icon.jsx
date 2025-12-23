import React from 'react'

export default function Icon({ name, className = '', title, size = 18, color }){
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  const stroke = 1.6
  const style = color ? { color } : undefined

  switch(name){
    case 'car':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect x="3" y="7" width="18" height="8" rx="2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="17" r="1.6" fill="currentColor" />
          <circle cx="17" cy="17" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'flight':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <path d="M2 16s6-2 10-4 8-3 10-3c0 0-6 2-10 4S2 16 2 16z" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 4l4 4" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'train':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect x="3" y="5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 20v-2M17 20v-2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'bike':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <circle cx="7" cy="16" r="3" stroke="currentColor" strokeWidth={stroke} fill="none" />
          <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth={stroke} fill="none" />
          <path d="M7 16L11 10L14 10" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'walk':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <circle cx="12" cy="4" r="1.6" fill="currentColor" />
          <path d="M9 8l2 6 3 3" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" fill="none" />
        </svg>
      )
    case 'energy':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <path d="M12 2v10l-3-1 1 4 5-6-3-1z" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'diet':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <path d="M4 12c4-3 12-3 16 0" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" />
          <path d="M12 2c1.5 4 3 6 6 8" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'waste':
      return (
        <svg {...common} className={className} style={style} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect x="5" y="6" width="14" height="12" rx="1" stroke="currentColor" strokeWidth={stroke} fill="none" />
          <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}
