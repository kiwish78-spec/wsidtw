interface StarburstProps {
  text: string
  color?: 'pink' | 'yellow' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorMap = {
  pink: 'bg-primary text-white',
  yellow: 'bg-secondary text-pop-black',
  cyan: 'bg-tertiary text-pop-black',
}

const sizeMap = {
  sm: 'w-16 h-16 text-xs',
  md: 'w-24 h-24 text-sm',
  lg: 'w-32 h-32 text-base',
}

export default function Starburst({ text, color = 'yellow', size = 'md', className = '' }: StarburstProps) {
  return (
    <div
      className={`
        relative flex items-center justify-center font-mono font-bold uppercase text-center leading-tight
        ${colorMap[color]}
        ${sizeMap[size]}
        ${className}
      `}
      style={{
        clipPath:
          'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
      }}
    >
      <span className="px-2">{text}</span>
    </div>
  )
}
