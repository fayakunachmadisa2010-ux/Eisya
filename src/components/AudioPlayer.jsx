import { useState } from 'react'
import config from '../config'

const BARS = [
  { spd: '0.50s', h: '18px', delay: '0.00s' },
  { spd: '0.70s', h: '12px', delay: '0.10s' },
  { spd: '0.60s', h: '20px', delay: '0.20s' },
  { spd: '0.80s', h: '14px', delay: '0.30s' },
  { spd: '0.55s', h: '16px', delay: '0.05s' },
]

// AudioPlayer hanya sebagai UI — audio sudah distart di App.jsx
export default function AudioPlayer({ mp3Audio, engine }) {
  const [playing, setPlaying] = useState(true)

  async function toggle() {
    if (playing) {
      if (mp3Audio) mp3Audio.pause()
      else await engine.stop()
      setPlaying(false)
    } else {
      if (mp3Audio) mp3Audio.play().catch(() => {})
      else await engine.start()
      setPlaying(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5
                 bg-white/90 backdrop-blur-sm border-2 border-blue-100
                 rounded-full px-4 py-2.5
                 shadow-lg shadow-blue-200/40
                 transition-all duration-200 hover:scale-105 hover:shadow-xl
                 active:scale-95"
      aria-label={playing ? 'Pause musik' : 'Play musik'}
    >
      <div className="flex items-end gap-0.5 h-5">
        {BARS.map((b, i) => (
          <div
            key={i}
            className="audio-bar"
            style={{
              '--spd':   b.spd,
              '--h':     b.h,
              '--delay': b.delay,
              height:    playing ? b.h : '4px',
              animationPlayState: playing ? 'running' : 'paused',
            }}
          />
        ))}
      </div>
      <span className="font-nunito text-blue-400 text-xs whitespace-nowrap">
        {playing ? `🎵 ${config.musicLabel}` : '▶ Play'}
      </span>
    </button>
  )
}
