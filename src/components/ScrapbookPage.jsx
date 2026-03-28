import Particles from "./Particles";
import PolaroidCard from "./PolaroidCard";
import BirthdayCard from "./BirthdayCard";
import config from "../config";

export default function ScrapbookPage() {
  return (
    <div
      className="page-scroll relative flex flex-col items-center w-full h-full"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(191,219,254,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(186,230,253,0.35) 0%, transparent 50%),
          linear-gradient(160deg, #eff6ff 0%, #e0f2fe 50%, #dbeafe 100%)
        `,
      }}
    >
      <Particles count={10} confettiCount={12} />

      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[-60px] w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="page-enter relative z-10 w-full max-w-4xl px-4 sm:px-6 pb-16 pt-10 flex flex-col items-center">
        {/* Header */}
        <div
          className="text-center mb-10"
          style={{ animation: "fadeInUp 0.8s 0.2s both" }}
        >
          <h2
            className="font-dancing text-blue-600 leading-tight"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
          >
            💙 Ini adalah kamu selama tahun 2025💙
          </h2>
          <div className="w-20 h-0.5 rounded-full bg-gradient-to-r from-transparent via-blue-300 to-transparent mx-auto my-3" />
          <p className="font-playfair italic text-blue-400 text-sm">
            Belda tuh selalu cantik, jadinya bikinya pegel banget
          </p>
        </div>

        {/* 12-photo polaroid grid */}
        <div
          className="w-full grid gap-5 sm:gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          }}
        >
          {config.memories.map((memory, i) => (
            <PolaroidCard key={i} memory={{ ...memory, index: i }} index={i} />
          ))}
        </div>

        {/* Birthday Card */}
        <BirthdayCard />

        <p
          className="font-dancing text-blue-400 text-center mt-10 text-xl opacity-70"
          style={{ animation: "fadeInUp 0.8s 1.5s both" }}
        >
          Made with the deepest love -Fayakun Achmad Isa
        </p>
      </div>
    </div>
  );
}
