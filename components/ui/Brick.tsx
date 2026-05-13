interface BrickProps {
  children:  React.ReactNode
  className?: string
  style?:    React.CSSProperties
}

export default function Brick({ children, className = '', style }: BrickProps) {
  return (
    <div className={`brick ${className}`} style={style}>
      {children}
    </div>
  )
}
