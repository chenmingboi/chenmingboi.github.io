function GlassPanel({ as: Tag = 'div', className = '', children, ...props }) {
  const mergedClassName = ['glass-panel', className].filter(Boolean).join(' ')
  return (
    <Tag className={mergedClassName} {...props}>
      {children}
    </Tag>
  )
}

export default GlassPanel
