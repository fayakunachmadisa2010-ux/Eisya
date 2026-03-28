import { useState, useCallback } from 'react'
import PasswordGate  from './components/PasswordGate'
import OpeningPage   from './components/OpeningPage'
import ScrapbookPage from './components/ScrapbookPage'
import AudioPlayer   from './components/AudioPlayer'
import config from './config'

// Buat instance Audio SEKARANG (saat module load) — bukan di dalam React
// Ini penting supaya .play() bisa langsung dipanggil di onClick tanpa menunggu render
const mp3Audio = config.musicSrc ? new Audio(config.musicSrc) : null
if (mp3Audio) { mp3Audio.loop = true; mp3Audio.preload = 'auto' }

const NOTES     = [261.63,261.63,293.66,261.63,349.23,329.63,261.63,261.63,293.66,261.63,392,349.23,261.63,261.63,523.25,440,349.23,329.63,293.66,466.16,466.16,440,349.23,392,349.23]
const DURATIONS = [0.3,0.1,0.4,0.4,0.4,0.8,0.3,0.1,0.4,0.4,0.4,0.8,0.3,0.1,0.4,0.4,0.4,0.4,0.8,0.3,0.1,0.4,0.4,0.4,0.8]

// Singleton audio engine — lives outside React so it persists across renders
export const audioEngine = {
  ctx: null,
  loopTimer: null,
  playing: false,

  async start() {
    if (this.playing) return
    if (this.ctx) { try { await this.ctx.close() } catch {} }
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    this.playing = true
    this._schedule()
  },

  _schedule() {
    if (!this.ctx || !this.playing) return
    let t = this.ctx.currentTime + 0.05
    NOTES.forEach((freq, i) => {
      const osc  = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + DURATIONS[i] * 0.85)
      osc.start(t)
      osc.stop(t + DURATIONS[i])
      t += DURATIONS[i]
    })
    const total = DURATIONS.reduce((a, b) => a + b, 0)
    clearTimeout(this.loopTimer)
    this.loopTimer = setTimeout(() => this._schedule(), (total - 0.3) * 1000)
  },

  async stop() {
    this.playing = false
    clearTimeout(this.loopTimer)
    if (this.ctx) { try { await this.ctx.close() } catch {} this.ctx = null }
  },
}

export default function App() {
  const [page,    setPage]    = useState('auth')
  const [exiting, setExiting] = useState(false)
  const [musicOn, setMusicOn] = useState(false)

  const transition = useCallback((to) => {
    setExiting(true)
    setTimeout(() => { setExiting(false); setPage(to) }, 500)
  }, [])

  // ⚠️ Audio dipanggil LANGSUNG di sini — masih dalam user gesture (onClick)
  const handleNext = useCallback(async () => {
    if (mp3Audio) {
      // mp3Audio sudah siap sejak module load, .play() langsung jalan
      mp3Audio.play().catch(async () => {
        // MP3 gagal (file tidak ada, format salah, dll) → fallback Web Audio
        await audioEngine.start()
      })
    } else {
      await audioEngine.start()
    }
    setMusicOn(true)
    transition('scrapbook')
  }, [transition])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${exiting ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'opacity' }}
      >
        {page === 'auth'      && <PasswordGate onUnlock={() => transition('opening')} />}
        {page === 'opening'   && <OpeningPage  onNext={handleNext} />}
        {page === 'scrapbook' && <ScrapbookPage />}
      </div>

      {musicOn && <AudioPlayer mp3Audio={mp3Audio} engine={audioEngine} />}
    </div>
  )
}
