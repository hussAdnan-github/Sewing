import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fabrics, fabricTypes, fabricColors } from '@/mocks/fabrics';

export default function Fabrics() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedColor, setSelectedColor] = useState('الكل');

  const filteredFabrics = useMemo(() => {
    return fabrics.filter((f) => {
      const matchType = selectedType === 'الكل' || f.type === selectedType;
      const matchColor = selectedColor === 'الكل' || f.color === selectedColor;
      return matchType && matchColor;
    });
  }, [selectedType, selectedColor]);

  return (
    <div className="min-h-screen bg-sand-50 pt-4 pb-24">
      <div className="w-full px-4">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="font-display text-2xl font-bold text-sand-900 mb-1">معرض الأقمشة</h1>
          <p className="text-sm text-sand-600">اختر من مجموعتنا المختارة من الأقمشة الفاخرة</p>
        </div>

        {/* Type Filters — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide mb-1">
          {fabricTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-gold-500 text-white shadow-sm'
                  : 'bg-white text-sand-700 border border-sand-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Color Filters — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide mb-4">
          {fabricColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedColor === color
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-white text-sand-700 border border-sand-200'
              }`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Fabric Grid — 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-3" data-product-shop>
          {filteredFabrics.map((f) => (
            <button
              key={f.id}
              onClick={() => navigate(`/fabric/${f.id}`)}
              className="group text-right bg-white rounded-2xl border border-sand-200 overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={f.images[0]}
                  alt={f.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-2 right-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium ${
                    f.availability === 'متوفر' ? 'bg-accent-500/90 text-white' :
                    f.availability === 'محدود' ? 'bg-gold-500/90 text-white' :
                    'bg-red-500/90 text-white'
                  }`}>
                    {f.availability}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-3">
                  <h3 className="font-display font-semibold text-white text-sm mb-0.5">{f.name}</h3>
                  <p className="text-white/90 text-xs">{f.price_per_meter} ريال/متر</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredFabrics.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-sand-100 rounded-full">
              <i className="ri-search-line text-2xl text-sand-400"></i>
            </div>
            <p className="text-sand-500">لا توجد أقمشة مطابقة للفلاتر المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
}