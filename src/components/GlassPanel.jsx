import { useEffect, useRef } from 'react'
import { attachLiquidGlass } from '../utils/liquidGlass.js'

function GlassPanel({ as: Tag = 'div', className = '', children, ...props }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const shader = attachLiquidGlass(panelRef.current)
    return () => {
      shader?.destroy()
    }
  }, [])

  const mergedClassName = ['glass-panel', className].filter(Boolean).join(' ')
  return (
    <Tag ref={panelRef} className={mergedClassName} {...props}>
      {children}
    </Tag>
  )
}

export default GlassPanel
