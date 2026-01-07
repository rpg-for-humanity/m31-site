export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center text-white px-6 relative overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-[center_60%]"
        style={{ backgroundImage: "url('/m31.jpg')" }}
      ></div>
      
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4 animate-sparkle">
          <span className="text-xl">✦</span>
          <p className="text-base md:text-lg uppercase tracking-[0.3em] text-white font-light">
            coming soon
          </p>
          <span className="text-xl">✦</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold mb-3 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          RPG for Human
          <span className="relative">
            ı
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sm md:text-lg animate-sparkle">
              ✦
            </span>
          </span>
          ty<span className="text-lg md:text-2xl text-white/70 align-top">™</span>
        </h1>

        <p className="text-2xl md:text-3xl text-cyan-400 font-medium mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Move freely in any language. Get closer in any culture.
        </p>

        <p className="text-lg md:text-xl text-white mb-2 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Every conversation starts with listening. Then roles shift - now <span className="italic">you</span> speak.
        </p>

        <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Complete missions. Build your habitat on M31.
        </p>

        <form 
          action="https://formspree.io/f/mjgknkoy" 
          method="POST"
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8 max-w-md mx-auto"
        >
          <input 
            type="email" 
            name="email" 
            placeholder="clair@rpg4h.com" 
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 w-full sm:w-64 focus:outline-none focus:border-cyan-400"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition w-full sm:w-auto"
          >
            Notify Me
          </button>
        </form>

        <div className="border-t border-white/20 pt-6 max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-white font-medium mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Built by learners, for learners.
          </p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Recreate the conversation you wish you'd practiced: the landlord call, the yoga class in French, the way your mom asks if you've eaten.
          </p>
          <p className="text-lg text-cyan-400 font-medium mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Anyone can build. Everyone can learn.
          </p>
        </div>
      </div>

      <footer className="absolute bottom-8 text-white/60 text-sm z-10 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        © 2025 RPG for Humanity ✦ NYC
      </footer>
    </main>
  );
}