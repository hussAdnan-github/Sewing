import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://public.readdy.ai/ai/img_res/bb76c319-54a9-435b-b75f-4ba9a84b143c.png"
            alt="شعار محل الخياطة الذكي"
            className="w-10 h-10 object-contain"
          />
          <span
            className={`font-display font-bold text-base transition-colors ${
              scrolled || !isHome ? 'text-sand-900' : 'text-white'
            }`}
          >
            الخياطة الذكي
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/search"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              scrolled || !isHome ? 'text-sand-700 hover:bg-sand-100' : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <i className="ri-search-line text-lg"></i>
          </Link>
          <Link
            to="/cart"
            className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              scrolled || !isHome ? 'text-sand-700 hover:bg-sand-100' : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <i className="ri-shopping-basket-2-line text-lg"></i>
            <span className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
          <Link
            to="/profile"
            className={`w-9 h-9 flex items-center justify-center rounded-full overflow-hidden transition-colors ${
              scrolled || !isHome ? 'hover:ring-2 hover:ring-sand-200' : 'hover:ring-2 hover:ring-white/30'
            }`}
          >
            <img
              src="https://readdy.ai/api/search-image?query=Middle%20eastern%20man%20in%20traditional%20white%20thobe%20portrait%20headshot%20neutral%20background%20warm%20natural%20lighting%20professional%20photography&width=400&height=400&seq=100&orientation=squarish"
              alt="الملف الشخصي"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </Link>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`ri-${menuOpen ? 'close' : 'menu'}-line text-xl ${scrolled || !isHome ? 'text-sand-800' : 'text-white'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="bg-white border-t border-sand-200 px-4 py-4 space-y-3 animate-fade-in">
          <Link to="/" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
          <Link to="/fabrics" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>الأقمشة</Link>
          <Link to="/tailoring" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>تفصيل الثوب</Link>
          <Link to="/cart" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>السلة</Link>
          <Link to="/search" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>البحث</Link>
          <hr className="border-sand-200" />
          <Link to="/orders" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>طلباتي</Link>
          <Link to="/profile" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>الملف الشخصي</Link>
          <Link to="/about" className="block text-sm font-medium text-sand-700 py-2" onClick={() => setMenuOpen(false)}>من نحن</Link>
          <span className="block text-sm font-medium text-sand-700 py-2">الإعدادات</span>
        </div>
      )}
    </nav>
  );
}
