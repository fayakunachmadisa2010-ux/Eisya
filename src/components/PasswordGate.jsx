import { useState, useRef, useEffect } from "react";
import Particles from "./Particles";
import config from "../config";

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === config.password) {
      setError(false);
      onUnlock();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(true);
      setValue("");
      setHint(next >= 3 ? "Yeu kocak~" : "Salah woi");
      setTimeout(() => setError(false), 600);
      inputRef.current?.focus();
    }
  }

  return (
    <div
      className="relative flex items-center justify-center h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #eff6ff 40%, #dbeafe 70%, #e0e7ff 100%)",
      }}
    >
      <Particles count={14} confettiCount={20} />

      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="page-enter relative z-10 flex flex-col items-center gap-6 w-full max-w-sm mx-4">
        {/* Icon */}
        <div
          className="photo-glow w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-sky-300
                        flex items-center justify-center text-5xl shadow-lg border-4 border-white"
        >
          🔐
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="glow-text font-dancing text-blue-600"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}
          >
            Selamat Datang, Belda!
          </h1>
          <p className="font-playfair italic text-blue-400 mt-1 text-sm">
            Masukkan password buat liat yang lucu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? "text" : "password"}
              className={`pw-input w-full px-5 py-3.5 rounded-2xl border-2 border-blue-200
                         bg-white/80 backdrop-blur-sm font-nunito text-blue-700 text-center
                         text-lg tracking-widest transition-all duration-200
                         placeholder:text-blue-200 placeholder:tracking-normal
                         ${error ? "error border-red-300" : "focus:border-blue-400"}`}
              placeholder="✦ ✦ ✦ ✦ ✦ ✦"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setHint("");
              }}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500 transition-colors text-lg"
              onClick={() => setShow((s) => !s)}
              tabIndex={-1}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>

          <div
            className={`text-center text-sm font-nunito transition-all duration-300 min-h-[1.25rem]
            ${hint ? "opacity-100" : "opacity-0"} ${error ? "text-red-400" : "text-blue-400"}`}
          >
            {hint}
          </div>

          <button
            type="submit"
            disabled={!value.trim()}
            className="relative w-full py-3.5 rounded-2xl font-dancing text-2xl text-white
                       bg-gradient-to-r from-blue-400 to-blue-500
                       shadow-lg shadow-blue-300/40 transition-all duration-200
                       hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-300/50
                       active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                       overflow-hidden group"
          >
            <span className="relative z-10">Buka Surprise ✨</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        <p className="text-blue-300 text-xs font-nunito text-center">
          🔒 Coba inget deh password yang aku kasih
        </p>
      </div>
    </div>
  );
}
