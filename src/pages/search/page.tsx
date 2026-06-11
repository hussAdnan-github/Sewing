import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fabrics, fabricTypes, fabricColors } from '@/mocks/fabrics';

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedColor, setSelectedColor] = useState('الكل');
  const [priceRange, setPriceRange] = useState<'الكل' | 'cheap' | 'mid' | 'premium'>('الكل');
  const [availability, setAvailability] = useState<'الكل' | 'متوفر' | 'محدود'>('الكل');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'newest'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredFabrics = useMemo(() => {
    let result = fabrics.filter((f) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q) ||
        f.color.toLowerCase().includes(q) ||
        f.composition.toLowerCase().includes(q);

      const matchesType = selectedType === 'الكل' || f.type === selectedType;
      const matchesColor = selectedColor === 'الكل' || f.color === selectedColor;
      const matchesAvailability = availability === 'الكل' || f.availability === availability;

      let matchesPrice = true;
      if (priceRange === 'cheap') matchesPrice = f.price_per_meter < 35;
      if (priceRange === 'mid') matchesPrice = f.price_per_meter >= 35 && f.price_per_meter < 60;
      if (priceRange === 'premium') matchesPrice = f.price_per_meter >= 60;

      return matchesQuery && matchesType && matchesColor && matchesAvailability && matchesPrice;
    });

    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price_per_meter - b.price_per_meter);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price_per_meter - a.price_per_meter);
    } else if (sortBy === 'newest') {
      result = [...result].reverse();
    }

    return result;
  }, [query, selectedType, selectedColor, priceRange, availability, sortBy]);

  const activeFilterCount =
    (selectedType !== 'الكل' ? 1 : 0) +
    (selectedColor !== 'الكل' ? 1 : 0) +
    (priceRange !== 'الكل' ? 1 : 0) +
    (availability !== 'الكل' ? 1 : 0);

  const clearFilters = () => {
    setSelectedType('الكل');
    setSelectedColor('الكل');
    setPriceRange('الكل');
    setAvailability('الكل');
  };

  return (
    <div className="min-h-screen bg-sand-50 pt-4 pb-24">
      <div className="w-full px-4">
        {/* Header + Search */}
        <div className="mb-4">
          <h1 className="font-display text-2xl font-bold text-sand-900 mb-3">البحث</h1>
          <div className="relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-sand-400"></i>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم القماش، النوع، اللون..."
              className="w-full bg-white rounded-xl border border-sand-200 pr-12 pl-4 py-3 text-sm text-sand-900 placeholder:text-sand-400 focus:outline-none focus:border-gold-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-sand-400 hover:text-sand-600"
              >
                <i className="ri-close-circle-fill text-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: filters + sort + view */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeFilterCount > 0 || showFilters
                ? 'bg-accent-500 text-white'
                : 'bg-white text-sand-700 border border-sand-200'
            }`}
          >
            <i className="ri-equalizer-line"></i>
            الفلتر
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {[
                { value: 'relevance', label: 'الأهمية' },
                { value: 'price_asc', label: 'الأقل سعراً' },
                { value: 'price_desc', label: 'الأعلى سعراً' },
                { value: 'newest', label: 'الأحدث' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value as typeof sortBy)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    sortBy === opt.value
                      ? 'bg-gold-500 text-white'
                      : 'bg-white text-sand-600 border border-sand-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex bg-white rounded-xl border border-sand-200 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-9 h-9 flex items-center justify-center text-sm ${
                viewMode === 'grid' ? 'bg-sand-100 text-sand-900' : 'text-sand-400'
              }`}
            >
              <i className="ri-grid-line"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-9 h-9 flex items-center justify-center text-sm ${
                viewMode === 'list' ? 'bg-sand-100 text-sand-900' : 'text-sand-400'
              }`}
            >
              <i className="ri-list-check"></i>
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sand-900 text-sm">الفلاتر</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-accent-600 hover:text-accent-700 font-medium"
                >
                  مسح الكل
                </button>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="text-xs text-sand-500 font-medium mb-2 block">النوع</label>
              <div className="flex flex-wrap gap-2">
                {fabricTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedType === type
                        ? 'bg-accent-500 text-white'
                        : 'bg-sand-50 text-sand-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-xs text-sand-500 font-medium mb-2 block">اللون</label>
              <div className="flex flex-wrap gap-2">
                {fabricColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedColor === color
                        ? 'bg-accent-500 text-white'
                        : 'bg-sand-50 text-sand-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs text-sand-500 font-medium mb-2 block">نطاق السعر</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'الكل', label: 'الكل' },
                  { value: 'cheap', label: 'أقل من 35 ريال' },
                  { value: 'mid', label: '35 - 60 ريال' },
                  { value: 'premium', label: '60+ ريال' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPriceRange(opt.value as typeof priceRange)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priceRange === opt.value
                        ? 'bg-gold-500 text-white'
                        : 'bg-sand-50 text-sand-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="text-xs text-sand-500 font-medium mb-2 block">التوفر</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'الكل', label: 'الكل' },
                  { value: 'متوفر', label: 'متوفر' },
                  { value: 'محدود', label: 'كمية محدودة' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAvailability(opt.value as typeof availability)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      availability === opt.value
                        ? 'bg-accent-500 text-white'
                        : 'bg-sand-50 text-sand-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-sand-600">
            {filteredFabrics.length} نتيجة
            {query && (
              <span>
                {' '}
                لـ "<span className="font-semibold text-sand-900">{query}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Results */}
        {filteredFabrics.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-3">
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
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium ${
                          f.availability === 'متوفر'
                            ? 'bg-accent-500/90 text-white'
                            : f.availability === 'محدود'
                            ? 'bg-gold-500/90 text-white'
                            : 'bg-red-500/90 text-white'
                        }`}
                      >
                        {f.availability}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 p-3">
                      <h3 className="font-display font-semibold text-white text-sm mb-0.5">
                        {f.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-white/90 text-xs">
                          {f.price_per_meter} ريال/متر
                        </p>
                        <p className="text-white/70 text-[10px]">{f.type}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFabrics.map((f) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/fabric/${f.id}`)}
                  className="group text-right bg-white rounded-2xl border border-sand-200 overflow-hidden active:scale-[0.98] transition-transform flex"
                >
                  <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                    <img
                      src={f.images[0]}
                      alt={f.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          f.availability === 'متوفر'
                            ? 'bg-accent-500/90 text-white'
                            : f.availability === 'محدود'
                            ? 'bg-gold-500/90 text-white'
                            : 'bg-red-500/90 text-white'
                        }`}
                      >
                        {f.availability}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-sand-900 text-sm mb-1">
                        {f.name}
                      </h3>
                      <p className="text-xs text-sand-500 line-clamp-2">{f.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] bg-sand-100 text-sand-600 px-2 py-0.5 rounded-full">
                          {f.type}
                        </span>
                        <span className="text-[10px] bg-sand-100 text-sand-600 px-2 py-0.5 rounded-full">
                          {f.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-display font-bold text-gold-600 text-sm">
                        {f.price_per_meter} ريال/متر
                      </p>
                      <span className="text-xs text-sand-400">{f.composition}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-sand-100 rounded-full">
              <i className="ri-search-line text-2xl text-sand-400"></i>
            </div>
            <h3 className="font-display text-lg font-semibold text-sand-900 mb-1">
              لا توجد نتائج
            </h3>
            <p className="text-sm text-sand-500 mb-6">
              جرب بحثاً مختلفاً أو اضبط الفلاتر للحصول على نتائج أكثر
            </p>
            <button
              onClick={() => {
                setQuery('');
                clearFilters();
              }}
              className="px-6 py-2.5 bg-accent-500 text-white rounded-xl text-sm font-medium active:bg-accent-600 transition-colors"
            >
              مسح البحث والفلاتر
            </button>
          </div>
        )}
      </div>


    </div>
  );
}