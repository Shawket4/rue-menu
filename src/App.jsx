import { useState, useEffect } from 'react';

const menuData = {
  softServe: {
    title: "Soft Serve",
    icon: "🍦",
    items: [
      { name: "Vanilla Soft Serve", desc: "Creamy classic vanilla soft serve, smooth and refreshing" },
      { name: "Coffee Soft Serve", desc: "Rich espresso-infused soft serve for coffee lovers" },
      { name: "Matcha Affogato", desc: "Matcha soft serve drowned in a shot of hot espresso" },
      { name: "Affogato", desc: "Vanilla soft serve with a shot of fresh espresso poured over" }
    ]
  },
  coffee: {
    title: "Coffee",
    icon: "☕",
    items: [
      { name: "Espresso", tags: ["S", "L"], desc: "Pure, bold shot of our signature blend" },
      { name: "Macchiato", tags: ["S", "L"], desc: "Espresso marked with a dollop of velvety foam" },
      { name: "Cortado", tags: ["S", "L"], desc: "Equal parts espresso and warm silky milk" },
      { name: "Cappuccino", tags: ["S", "L"], desc: "Classic Italian espresso with thick, frothy milk" },
      { name: "Flat White", tags: ["S", "L"], desc: "Velvety microfoam over rich double espresso" },
      { name: "Americano", tags: ["Iced", "Hot"], desc: "Espresso diluted with hot water for a smooth finish" },
      { name: "Latte", tags: ["Blended", "Iced", "Hot"], desc: "Smooth espresso with steamed milk and light foam" },
      { name: "Spanish Latte", tags: ["Blended", "Iced", "Hot"], desc: "Sweet condensed milk meets bold espresso" }
    ]
  },
  matcha: {
    title: "Matcha",
    icon: "🍵",
    items: [
      { name: "Matcha Latte", tags: ["Blended", "Iced", "Hot"], desc: "Premium ceremonial grade matcha with creamy milk" },
      { name: "Strawberry Matcha", tags: ["Blended", "Iced", "Hot"], desc: "Sweet strawberry meets earthy matcha perfection" }
    ]
  },
  chocolate: {
    title: "House Choco",
    icon: "🍫",
    items: [
      { name: "Hot Chocolate", desc: "Rich, velvety house-made chocolate drink" },
      { name: "Iced Chocolate Milk", desc: "Chilled chocolate milk, creamy and refreshing" },
      { name: "Softserve Hot Chocolate", desc: "Decadent hot chocolate topped with soft serve" }
    ]
  },
  refreshers: {
    title: "Refreshers",
    icon: "🍋",
    items: [
      { name: "Ruemonade", desc: "Our signature house lemonade, perfectly balanced" },
      { name: "Iced Tea Peach", desc: "Cold-brewed tea with sweet peach notes" },
      { name: "Iced Chai", desc: "Spiced chai served cold over ice" },
      { name: "Floral Colada", desc: "Tropical coconut with delicate floral hints" },
      { name: "Strawberry Cooler", desc: "Fresh strawberry blend, cool and fruity" }
    ]
  },
  flavoring: {
    title: "Flavoring",
    icon: "✨",
    items: ["Vanilla", "Salted Vanilla", "Caramel", "Salted Caramel", "Salted Maple", "Pistachio", "Mocha", "White Mocha", "Crème Brulée", "Fragrant Cinnamon", "Pumpkin Spice", "Banana", "Honey"]
  },
  altMilk: {
    title: "Alt Milk",
    icon: "🥛",
    items: ["Coconut Milk", "Almond Milk", "Oat Milk"]
  }
};

const MenuItem = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isObject = typeof item === 'object';
  const name = isObject ? item.name : item;
  const tags = isObject ? item.tags : null;
  const desc = isObject ? item.desc : null;

  return (
    <div
      className={`group py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${isExpanded ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50' : 'border-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/50'}`}
      style={{
        animation: `fadeSlideIn 0.4s ease-out ${index * 60}ms forwards`,
        opacity: 0
      }}
      onClick={() => desc && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium tracking-wide transition-colors duration-200 ${isExpanded ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-900'}`}>
          {name}
        </span>
        <div className="flex items-center gap-2">
          {tags && (
            <div className="flex gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors duration-200 ${isExpanded ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {desc && (
            <svg
              className={`w-4 h-4 text-blue-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>
      {desc && (
        <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
          <p className="text-xs text-blue-600 leading-relaxed">{desc}</p>
        </div>
      )}
    </div>
  );
};

const Section = ({ data, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white rounded-3xl p-5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-blue-900/10 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        boxShadow: '0 4px 20px -5px rgba(30, 58, 138, 0.08), 0 0 0 1px rgba(30, 58, 138, 0.05)'
      }}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-blue-50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
          <span className="text-xl">{data.icon}</span>
        </div>
        <h3 className="font-bold text-blue-900 text-lg tracking-tight">{data.title}</h3>
      </div>
      <div className="space-y-1">
        {data.items.map((item, i) => (
          <MenuItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

const TagSection = ({ data, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white rounded-3xl p-5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-blue-900/10 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        boxShadow: '0 4px 20px -5px rgba(30, 58, 138, 0.08), 0 0 0 1px rgba(30, 58, 138, 0.05)'
      }}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-blue-50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
          <span className="text-xl">{data.icon}</span>
        </div>
        <h3 className="font-bold text-blue-900 text-lg tracking-tight">{data.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.items.map((item, i) => (
          <span
            key={i}
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium hover:from-blue-100 hover:to-indigo-100 hover:text-blue-900 transition-all duration-200 cursor-pointer hover:scale-105 border border-blue-100 hover:border-blue-200"
            style={{
              animation: `fadeSlideIn 0.4s ease-out ${i * 40}ms forwards`,
              opacity: 0
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const CoffeeBeanDecor = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="12" rx="8" ry="11" opacity="0.15" />
    <path d="M12 1C8 1 5 5 5 12s3 11 7 11c-2-2-3-5-3-11s1-9 3-11z" opacity="0.3" />
  </svg>
);

export default function RueCoffeeMenu() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 flex flex-col relative overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        * { font-family: 'Cairo', sans-serif; }
        
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>

      {/* Floating decorative elements - static, desktop only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <CoffeeBeanDecor
          className="absolute w-16 h-16 text-blue-900 opacity-20"
          style={{ top: '10%', left: '5%' }}
        />
        <CoffeeBeanDecor
          className="absolute w-12 h-12 text-blue-800 opacity-20"
          style={{ top: '60%', left: '8%' }}
        />
        <CoffeeBeanDecor
          className="absolute w-20 h-20 text-blue-900 opacity-20"
          style={{ top: '15%', right: '5%' }}
        />
        <CoffeeBeanDecor
          className="absolute w-10 h-10 text-blue-800 opacity-20"
          style={{ top: '70%', right: '10%' }}
        />

        <div
          className="absolute w-96 h-96 rounded-full opacity-50"
          style={{
            top: '-10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-50"
          style={{
            bottom: '10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/90 border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="relative">
            <img
              src="Rue-Logo.png"
              alt="The Rue Logo"
              className="h-12 w-auto animate-bounce-subtle"
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-600 font-bold tracking-widest uppercase">SPECIALTY COFFEE</p>
            <a
              href="https://www.instagram.com/theruecoffee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 tracking-wider font-semibold uppercase hover:text-blue-500 transition-colors duration-300"
            >
              @THERUECOFFEE
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div
        className="text-center py-12 px-6 transition-all duration-1000 relative"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(-30px)'
        }}
      >
        <p className="text-blue-600 font-semibold tracking-[0.3em] uppercase text-xs mb-3">Welcome to</p>
        <h1 className="text-5xl sm:text-6xl font-black text-blue-900 mb-4 tracking-tight">
          Our Menu
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
          Crafted with passion, served with care.
          <br />
          <span className="text-blue-600 font-semibold">Quality in every cup.</span>
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-300" />
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-300" />
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-16 relative flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Section data={menuData.coffee} className="lg:row-span-2" delay={100} />
          <Section data={menuData.softServe} delay={200} />
          <Section data={menuData.matcha} delay={300} />
          <Section data={menuData.chocolate} delay={400} />
          <Section data={menuData.refreshers} delay={500} />
          <TagSection data={menuData.flavoring} className="md:col-span-2 lg:col-span-2" delay={600} />
          <TagSection data={menuData.altMilk} delay={700} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 py-10 relative overflow-hidden mt-auto">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 flex justify-center relative z-10">
          <img
            src="Rue-Full.png"
            alt="The Rue Logo"
            className="h-14 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300 hover:scale-105 transform"
          />
        </div>
      </footer>
    </div>
  );
}