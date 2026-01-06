export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center text-white px-6 relative overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-[center_60%]"
        style={{ backgroundImage: "url('/m31.jpg')" }}
      ></div>
      
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6 animate-sparkle">
          <span className="text-xl">✦</span>
          <p className="text-base md:text-lg uppercase tracking-[0.3em] text-white">
            coming soon
          </p>
          <span className="text-xl">✦</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          RPG for Human
          <span className="relative">
            ı
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sm md:text-lg animate-sparkle">
              ✦
            </span>
          </span>
          ty<span className="text-lg md:text-2xl text-white/70 align-top">™</span>
        </h1>

        <p className="text-2xl md:text-3xl text-cyan-400 font-semibold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Learn by unlocking, not drilling.
        </p>

        <p className="text-lg md:text-xl text-white mb-4 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Every NPC knows something you need. Start by listening. Level up to speaking. Complete the mission.
        </p>

        <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Order coffee. Ask for directions. Survive your first day at work.
          <br />
          Then flip the role — now <span className="italic">you're</span> the one being asked.
        </p>

        <div className="border-t border-white/20 pt-8 mt-4 max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-white font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Built by learners, for learners.
          </p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Recreate the conversation you wish you'd practiced. The phone call with your landlord. The yoga class in French. The way your mom asks if you've eaten.
          </p>
          <p className="text-lg text-cyan-400 font-semibold mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Anyone can build. Everyone can learn.
          </p>
        </div>
      </div>

      <footer className="absolute bottom-8 text-white/60 text-sm z-10 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        © 2025 RPG for Humanity ✦ NYC
      </footer>
    </main>
  );
}