import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeOrder] = useState({
    id: 'ORD-2026-001',
    status: 'جاري التفصيل',
    progress: 60,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-[520px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20tailoring%20workshop%20interior%20with%20luxury%20fabrics%20rolled%20on%20shelves%20soft%20warm%20golden%20lighting%20rich%20wooden%20furniture%20arabic%20style%20interior%20design%20clean%20professional%20photography&width=1400&height=700&seq=50&orientation=landscape')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className={`transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              فن التفصيل
              <br />
              <span className="text-gold-300">بلمسة ذكية</span>
            </h1>
            <p className="text-lg text-white/90 mb-10 max-w-sm mx-auto leading-relaxed">
              اختر قماشك، صمم ثوبك، واستلمه على بابك
            </p>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="w-full px-4 -mt-24 relative z-20 pb-6">
        <div className="space-y-3">
          <Link
            to="/fabrics"
            className="group relative bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl p-5 shadow-lg active:scale-[0.98] transition-transform overflow-hidden flex items-center gap-4"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="relative w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl backdrop-blur-sm">
              <i className="ri-t-shirt-line text-2xl text-white"></i>
            </div>
            <div className="text-right">
              <h3 className="font-display text-lg font-bold text-white mb-1">اختيار قماش</h3>
              <p className="text-sm text-white/80">تصفح معرض أقمشتنا الفاخرة</p>
            </div>
            <div className="mr-auto w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <i className="ri-arrow-left-line text-white"></i>
            </div>
          </Link>

          <Link
            to="/tailoring"
            className="group relative bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl p-5 shadow-lg active:scale-[0.98] transition-transform overflow-hidden flex items-center gap-4"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="relative w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl backdrop-blur-sm">
              <i className="ri-scissors-line text-2xl text-white"></i>
            </div>
            <div className="text-right">
              <h3 className="font-display text-lg font-bold text-white mb-1">تفصيل ثوب</h3>
              <p className="text-sm text-white/80">صمم ثوبك بكل تفاصيله</p>
            </div>
            <div className="mr-auto w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
              <i className="ri-arrow-left-line text-white"></i>
            </div>
          </Link>
        </div>
      </div>

      {/* Active Order Banner */}
      <div className="w-full px-4 mb-6">
        <div className="bg-white rounded-2xl border border-sand-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-sand-900 text-sm">طلباتك الجارية</h3>
            <span className="text-xs text-sand-500 bg-sand-100 px-2 py-1 rounded-full">طلب نشط</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-[3px] border-gold-200 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E8E4DC" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="#D4AC53" strokeWidth="3"
                  strokeDasharray={`${activeOrder.progress} ${100 - activeOrder.progress}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-bold text-gold-700">{activeOrder.progress}%</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sand-900">{activeOrder.id}</p>
              <p className="text-xs text-accent-600 font-medium">{activeOrder.status}</p>
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-gold-50 rounded-xl text-gold-600">
              <i className="ri-eye-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-4 py-4">
        <h2 className="font-display text-lg font-bold text-sand-900 mb-4">لماذا الخياطة الذكي؟</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              {
                icon: 'ri-ruler-line',
                title: 'مقاسات دقيقة',
                desc: 'نظام قياس ذكي يضمن لك الثوب المثالي',
              },
              {
                icon: 'ri-time-line',
                title: 'سرعة التسليم',
                desc: 'استلم ثوبك في الوقت المحدد مع تتبع فوري',
              },
              {
                icon: 'ri-star-smile-line',
                title: 'جودة فاخرة',
                desc: 'أفضل الأقمشة بأيدي خياطين محترفين',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex-shrink-0 w-[260px] bg-white rounded-2xl p-4 border border-sand-200">
                <div className="w-11 h-11 flex items-center justify-center bg-gold-50 rounded-xl mb-3">
                  <i className={`${feature.icon} text-xl text-gold-600`}></i>
                </div>
                <h4 className="font-display font-semibold text-sand-900 text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-sand-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
      </div>

      {/* Popular Styles Preview */}
      <div className="w-full px-4 py-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-sand-900">الطرازات الشائعة</h2>
          <Link to="/tailoring" className="text-xs text-gold-600 hover:text-gold-700 font-medium">
            الكل <i className="ri-arrow-left-line"></i>
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              { name: 'سعودي', img: 'https://readdy.ai/api/search-image?query=Traditional%20Saudi%20thobe%20white%20garment%20on%20mannequin%20elegant%20minimal%20neutral%20background%20tailoring%20showcase&width=300&height=380&seq=60&orientation=portrait' },
              { name: 'قطري', img: 'https://readdy.ai/api/search-image?query=Traditional%20Qatari%20thobe%20white%20garment%20on%20mannequin%20elegant%20minimal%20neutral%20background%20tailoring%20showcase&width=300&height=380&seq=61&orientation=portrait' },
              { name: 'عماني', img: 'https://readdy.ai/api/search-image?query=Traditional%20Omani%20dishdasha%20white%20garment%20on%20mannequin%20elegant%20minimal%20neutral%20background%20tailoring%20showcase&width=300&height=380&seq=62&orientation=portrait' },
            ].map((style) => (
              <Link
                key={style.name}
                to="/tailoring"
                className="group relative flex-shrink-0 w-[220px] rounded-2xl overflow-hidden aspect-[4/5] bg-sand-100"
              >
                <img
                  src={style.img}
                  alt={`ثوب ${style.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-3">
                  <h4 className="font-display font-semibold text-white text-sm">الثوب {style.name}</h4>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}
