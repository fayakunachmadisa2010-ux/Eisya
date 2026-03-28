const STICKER_POSITIONS = [
  { top: '-12px', right: '-10px' },
  { top: '-10px', left:  '-8px'  },
  { bottom: '48px', right: '-10px' },
  { top: '-12px', right: '-8px'  },
  { top: '-10px', left:  '-6px'  },
  { bottom: '48px', left: '-8px' },
  { top: '-12px', left:  '-10px' },
  { top: '-8px',  right: '-12px' },
  { bottom: '50px', right: '-8px' },
  { top: '-10px', right: '-6px'  },
  { bottom: '48px', left: '-10px' },
  { top: '-12px', left:  '-8px'  },
]

export default function PolaroidCard({ memory, index }) {
  const pos = STICKER_POSITIONS[index % STICKER_POSITIONS.length]

  return (
    <div
      className="polaroid relative bg-white rounded-sm cursor-pointer
                 transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]
                 hover:z-10 hover:shadow-2xl"
      style={{
        '--tilt': memory.tilt,
        padding: '10px 10px 40px',
        boxShadow: '0 10px 32px rgba(59,130,246,0.16), 4px 4px 0 rgba(147,197,253,0.25)',
        animation: `slideIn 0.7s ${index * 0.1}s both cubic-bezier(.34,1.56,.64,1)`,
      }}
    >
      {/* Sticker */}
      <span
        className="sticker-bounce absolute text-xl select-none pointer-events-none z-10"
        style={pos}
      >
        {memory.sticker}
      </span>

      {/* Photo */}
      <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-sky-100
                      overflow-hidden flex flex-col items-center justify-center gap-1.5
                      text-blue-400 rounded-[2px]">
        {memory.photo ? (
          <img src={memory.photo} alt={memory.caption} className="w-full h-full object-cover" />
        ) : (
          <>
            <span className="text-3xl">📷</span>
            <span className="font-nunito text-[0.6rem] text-center leading-tight">
              Foto {memory.index + 1}
            </span>
          </>
        )}
      </div>

      <p className="font-dancing text-blue-500 text-center mt-2 text-base leading-tight">
        {memory.caption}
      </p>
      <p className="font-nunito text-[0.6rem] text-blue-300 text-center mt-0.5">
        {memory.date}
      </p>
    </div>
  )
}
