import { useMemo } from 'react'

const FLOATER_EMOJIS  = ['💙','🩵','✨','💫','🌟','💕','🎀','🎊','❄️']
const CONFETTI_COLORS = ['#60a5fa','#93c5fd','#bfdbfe','#7dd3fc','#fbcfe8','#a5f3fc','#c4b5fd','#fde68a']
const rand = (min, max) => min + Math.random() * (max - min)

export default function Particles({ count = 16, confettiCount = 24 }) {
  const floaters = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: FLOATER_EMOJIS[Math.floor(Math.random() * FLOATER_EMOJIS.length)],
      left:  `${rand(2, 96)}%`,
      dur:   `${rand(5, 10)}s`,
      delay: `${rand(0, 7)}s`,
      size:  `${rand(0.9, 1.8)}rem`,
    })), [count])

  const confettis = useMemo(() =>
    Array.from({ length: confettiCount }, (_, i) => ({
      id: i,
      color:   CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      left:    `${rand(0, 100)}%`,
      dur:     `${rand(3, 7)}s`,
      delay:   `${rand(0, 5)}s`,
      drift:   `${(Math.random() - 0.5) * 160}px`,
      width:   `${rand(7, 14)}px`,
      height:  `${rand(7, 14)}px`,
      rounded: Math.random() > 0.5,
    })), [confettiCount])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floaters.map(f => (
        <div key={`f-${f.id}`} className="floater select-none"
          style={{ left: f.left, '--dur': f.dur, '--delay': f.delay, fontSize: f.size }}>
          {f.emoji}
        </div>
      ))}
      {confettis.map(c => (
        <div key={`c-${c.id}`} className="confetti"
          style={{
            left: c.left, background: c.color,
            '--dur': c.dur, '--delay': c.delay, '--drift': c.drift,
            width: c.width, height: c.height,
            borderRadius: c.rounded ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}
