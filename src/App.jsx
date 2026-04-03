import { useState, useMemo } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Coffee,
  Footprints,
  Gem,
  Heart,
  RefreshCw,
  Shirt,
  Sparkles,
  Stars,
  Sun,
  Umbrella,
  User,
  ShoppingBag,
} from 'lucide-react';
import { WEATHER_OPTIONS, MOOD_OPTIONS, OOTD_DATA } from './data';

export default function App() {
  const [userData, setUserData] = useState({ name: '', age: '', submitted: false });
  const [weather, setWeather] = useState('sunny');
  const [mood, setMood] = useState('energetic');
  const [isGenerating, setIsGenerating] = useState(false);

  const recommendation = useMemo(() => {
    return OOTD_DATA[`${weather}-${mood}`] || OOTD_DATA['sunny-energetic'];
  }, [weather, mood]);

  const handleOnboarding = (e) => {
    e.preventDefault();
    if (userData.name && userData.age) {
      setUserData({ ...userData, submitted: true });
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  const openMyntra = () => {
    window.open('https://www.myntra.com', '_blank');
  };

  if (!userData.submitted) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl shadow-rose-100 border border-rose-50 text-center animate-in fade-in zoom-in duration-500">
          <div className="inline-block p-4 bg-rose-50 rounded-3xl mb-6">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Welcome, Gorgeous!</h1>
          <p className="text-rose-400 font-medium mb-8">Tell us a bit about yourself ✨</p>
          <form onSubmit={handleOnboarding} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
              <input
                type="text"
                placeholder="What's your name?"
                required
                className="w-full bg-rose-50/50 border-2 border-rose-50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-rose-300 transition-all placeholder:text-rose-200 font-bold"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="relative">
              <Stars className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
              <input
                type="number"
                placeholder="How old are you?"
                required
                className="w-full bg-rose-50/50 border-2 border-rose-50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-rose-300 transition-all placeholder:text-rose-200 font-bold"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-400 text-white py-4 rounded-2xl font-black text-lg hover:bg-rose-500 transition-all flex items-center justify-center gap-2 group"
            >
              Start Styling <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-slate-800 font-sans p-4 md:p-8 selection:bg-rose-200">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-block p-2 bg-rose-100 rounded-full mb-4">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-rose-400 to-fuchsia-500 bg-clip-text text-transparent">
            Girly OOTD
          </h1>
          <div className="flex items-center justify-center gap-2 text-rose-400 font-bold">
            <span>Hello, {userData.name}!</span>
            <span className="w-1.5 h-1.5 bg-rose-200 rounded-full"></span>
            <span>{userData.age} years of style ✨</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-rose-100 border border-rose-50">
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-rose-300 mb-5 flex items-center gap-2">
                <Sun className="w-4 h-4" /> The Forecast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {WEATHER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setWeather(opt.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-300 ${
                      weather === opt.id
                        ? `border-rose-400 bg-rose-50 shadow-inner scale-95`
                        : 'border-rose-50 hover:border-rose-200 bg-white/50 text-slate-400'
                    }`}
                  >
                    <opt.icon className={`w-7 h-7 mb-2 ${weather === opt.id ? opt.color : ''}`} />
                    <span className={`text-[10px] font-bold ${weather === opt.id ? 'text-rose-600' : ''}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-rose-300 mb-5 flex items-center gap-2">
                <Stars className="w-4 h-4" /> Today's Vibe
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {MOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMood(opt.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-300 ${
                      mood === opt.id
                        ? 'border-rose-400 bg-rose-50 shadow-inner scale-95'
                        : 'border-rose-50 hover:border-rose-200 bg-white/50 text-slate-400'
                    }`}
                  >
                    <opt.icon className={`w-7 h-7 mb-2 ${mood === opt.id ? opt.color : ''}`} />
                    <span className={`text-[10px] font-bold ${mood === opt.id ? 'text-rose-600' : ''}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <button
              onClick={handleGenerate}
              className="w-full bg-rose-400 text-white py-5 rounded-3xl font-black text-lg hover:bg-rose-500 transition-all shadow-lg shadow-rose-200 active:scale-95 flex items-center justify-center gap-3 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
              <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              Manifest My Outfit
            </button>
          </div>

          <div className={`transition-all duration-500 ${isGenerating ? 'opacity-40 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}>
            <div className="bg-[#1e1e1e] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-rose-100">
              <div
                className="absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-40 -mr-16 -mt-16 rounded-full transition-colors duration-700"
                style={{ backgroundColor: recommendation.colors[0] }}
              />

              <div className="p-8 md:p-12 space-y-10 relative z-10">
                <header>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 rounded-full text-rose-300 text-[10px] font-black uppercase tracking-widest mb-6 border border-rose-500/30">
                    <Stars className="w-3 h-3 text-rose-400" /> Style Pick
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-sm">{recommendation.outfit}</h3>
                  <p className="text-rose-100/60 leading-relaxed font-medium italic">"{recommendation.description}"</p>
                </header>

                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-rose-500/20 transition-colors">
                      <Shirt className="w-6 h-6 text-rose-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-rose-300/40 uppercase tracking-widest mb-1">The Fit</p>
                      <p className="text-white text-lg font-bold">{recommendation.outfit}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-rose-500/20 transition-colors">
                      <Footprints className="w-6 h-6 text-rose-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-rose-300/40 uppercase tracking-widest mb-1">Footwear</p>
                      <p className="text-white text-lg font-bold">{recommendation.shoes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-fuchsia-500/20 transition-colors">
                      <Gem className="w-6 h-6 text-fuchsia-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-rose-300/40 uppercase tracking-widest mb-1">Accessories</p>
                      <p className="text-white text-lg font-bold">{recommendation.acc}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-rose-300/40 uppercase tracking-widest mb-4">Aesthetic Palette</p>
                  <div className="flex gap-4">
                    {recommendation.colors.map((color, idx) => (
                      <div key={idx} className="group relative">
                        <div
                          className="w-12 h-12 rounded-2xl border border-white/10 shadow-xl cursor-help transition-all hover:scale-110 hover:-rotate-6"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  onClick={openMyntra}
                  className="mt-4 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded-[2rem] p-5 flex items-center justify-between group cursor-pointer hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <ShoppingBag className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-white text-base font-black">Shop on Myntra</p>
                      <p className="text-rose-100 text-xs font-medium">Explore trending styles</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 mb-10 text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Heart key={i} className="w-3 h-3 text-rose-200 fill-rose-100" />
            ))}
          </div>
          <p className="text-rose-300 text-[10px] font-black uppercase tracking-[0.3em] leading-loose">
            Keep shining, beautiful. <br />
            <span className="text-rose-400 opacity-80">Manifested with love by Aditya</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
