import { useState } from 'react'
import config from '../config'

export default function BirthdayCard() {
  const [opened, setOpened] = useState(false)

  return (
    <div className="w-full max-w-lg mx-auto mt-12 mb-2">
      <p className="font-dancing text-blue-600 text-center mb-6" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
        💌 Sebuah Pesan Untukmu
      </p>

      {!opened ? (
        <button onClick={() => setOpened(true)} className="w-full group" aria-label="Buka kartu">
          <div className="relative w-full rounded-3xl overflow-hidden text-center
                          bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
                          p-12 shadow-2xl shadow-blue-300/40
                          transition-all duration-300 group-hover:-translate-y-1 group-active:scale-95">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
            <span className="absolute top-4 left-4 text-xl opacity-60">✨</span>
            <span className="absolute top-4 right-4 text-xl opacity-60">✨</span>
            <span className="absolute bottom-4 left-4 text-xl opacity-60">💙</span>
            <span className="absolute bottom-4 right-4 text-xl opacity-60">💙</span>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="text-5xl">💙</span>
              <h3 className="font-dancing text-white leading-snug" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}>
                Happy {config.age}th Birthday,<br />{config.name.split(' ')[0]}!
              </h3>
              <p className="font-nunito text-white/70 text-sm mt-2 animate-pulse">
                Ketuk untuk membuka kartu 💌
              </p>
            </div>
          </div>
        </button>
      ) : (
        <div className="card-open-anim w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-300/30">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-8 py-7 text-center">
            <div className="text-3xl mb-2">💙 🎂 💙</div>
            <h3 className="font-dancing text-white leading-snug" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Untuk {config.name}
            </h3>
          </div>
          <div className="px-8 py-8" style={{ background: 'linear-gradient(160deg, #fdfbff 0%, #eff6ff 100%)' }}>
            {config.cardLines.map((line, i) => (
              <p key={i}
                className="font-playfair italic text-blue-500/80 leading-loose
                           border-b border-dashed border-blue-200 pb-2 mb-2 last:border-0"
                style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)' }}>
                {line}
              </p>
            ))}
            <div className="text-center text-2xl tracking-widest mt-5">💙 ✨ 🎂 ✨ 💙</div>
            <p className="font-dancing text-blue-500 text-right mt-5 text-2xl">{config.cardSignature}</p>
          </div>
        </div>
      )}
    </div>
  )
}
