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

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          RPG for Human
          <span className="relative">
            ı
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sm md:text-lg animate-sparkle">
              ✦
            </span>
          </span>
          ty<span className="text-lg md:text-2xl text-white/70 align-top">™</span>
        </h1>

        <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Master languages and explore cultures through interactions 
          <br />
          with AI companions on M31, Andromeda.
        </p>

        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Every achievement unlocks <span className="text-cyan-400 font-semibold">"Earth Investment"</span>, building habitats 
          <br />
          where humans and AI coexist in a shared future.
        </p>

      <footer className="absolute bottom-8 text-white/60 text-sm z-10 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        © 2025 RPG for Humanity ✦ NYC
      </footer>
    </main>
  );
}
