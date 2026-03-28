import { useState, useEffect } from "react";
import Particles from "./Particles";
import config from "../config";

export default function OpeningPage({ onNext }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #eff6ff 40%, #dbeafe 70%, #e0e7ff 100%)",
      }}
    >
      <Particles count={18} confettiCount={28} />

      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="page-enter relative z-10 flex flex-col items-center">
        {/* Profile photo */}
        <div
          className="photo-glow w-40 h-40 rounded-full border-[5px] border-white overflow-hidden
                        bg-gradient-to-br from-blue-200 to-sky-200 mb-7 flex-shrink-0"
        >
          {config.profilePhoto ? (
            <img
              src={config.profilePhoto}
              alt={config.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-blue-400">
              <span className="text-4xl">📷</span>
              <span className="font-nunito text-[0.65rem] text-center leading-tight px-2">
                Taruh foto
                <br />
                kamu di sini
              </span>
            </div>
          )}
        </div>

        {/* Greeting */}
        <h1
          className="glow-text font-dancing text-blue-600 text-center leading-snug px-5"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.6rem)" }}
        >
          {config.greeting},<br />
          {config.name}
        </h1>

        <p
          className="font-playfair italic text-blue-400 mt-3 text-center px-6"
          style={{
            fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
            animation: "fadeInUp 0.8s 0.9s both",
          }}
        >
          Sweet {config.age} ✨ Hope u like it
        </p>

        <div
          className="w-20 h-0.5 rounded-full bg-gradient-to-r from-transparent via-blue-300 to-transparent mt-4"
          style={{ animation: "fadeInUp 0.8s 1.1s both" }}
        />

        {/* Next button — appears after 4.5s, click triggers audio (user gesture) */}
        <div
          style={{
            marginTop: "2rem",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(0)" : "translateY(20px)",
            pointerEvents: showButton ? "auto" : "none",
          }}
        >
          <button
            onClick={onNext}
            className="relative px-12 py-3.5 rounded-full font-dancing text-2xl text-white
                       bg-gradient-to-r from-blue-400 to-blue-500
                       shadow-xl shadow-blue-300/40 overflow-hidden group
                       transition-all duration-200
                       hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-300/50
                       active:scale-95"
          >
            <span className="relative z-10">Lanjut nih?</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
