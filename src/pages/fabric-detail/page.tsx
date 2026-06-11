import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fabrics } from '@/mocks/fabrics';

export default function FabricDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fabric = useMemo(() => fabrics.find((f) => f.id === id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [quantityMode, setQuantityMode] = useState<'meters' | 'thobes'>('meters');
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const thobeMeters = 3.5;
  const calculatedQuantity = quantityMode === 'meters' ? quantity : quantity * thobeMeters;
  const totalPrice = fabric ? calculatedQuantity * fabric.price_per_meter : 0;

  const similarFabrics = useMemo(() => {
    if (!fabric) return [];
    return fabrics.filter((f) => f.type === fabric.type && f.id !== fabric.id).slice(0, 4);
  }, [fabric]);

  if (!fabric) {
    return (
      <div className="min-h-screen bg-sand-50 pt-20 pb-24 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 flex items-center justify-center bg-sand-100 rounded-full mb-5">
          <i className="ri-error-warning-line text-4xl text-sand-400"></i>
        </div>
        <h2 className="font-display text-xl font-bold text-sand-900 mb-2">القماش غير موجود</h2>
        <p className="text-sm text-sand-500 text-center mb-8">المنتج الذي تبحث عنه غير متوفر حالياً</p>
        <button
          onClick={() => navigate('/fabrics')}
          className="px-8 py-3 bg-accent-500 text-white rounded-xl text-sm font-medium active:bg-accent-600 transition-colors"
        >
          العودة للأقمشة
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const stockPercent = Math.min(100, (fabric.quantity / 200) * 100);

  return (
    <div className="min-h-screen bg-sand-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center bg-sand-100 rounded-full text-sand-700 active:bg-sand-200 transition-colors"
        >
          <i className="ri-arrow-right-line"></i>
        </button>
        <h1 className="font-display font-semibold text-sand-900 text-sm flex-1 truncate">{fabric.name}</h1>
        <Link
          to="/cart"
          className="relative w-9 h-9 flex items-center justify-center bg-sand-100 rounded-full text-sand-700 active:bg-sand-200 transition-colors"
        >
          <i className="ri-shopping-basket-2-line"></i>
          <span className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-white">
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={fabric.images[activeImage] || fabric.images[0]}
            alt={fabric.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-4 right-4">
            <span
              className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${
                fabric.availability === 'متوفر'
                  ? 'bg-accent-500/90 text-white'
                  : fabric.availability === 'محدود'
                  ? 'bg-gold-500/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}
            >
              {fabric.availability}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        {fabric.images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
            {fabric.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImage === idx ? 'border-gold-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full px-4 py-5 space-y-6">
        {/* Title & Price */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs bg-sand-100 text-sand-600 px-2.5 py-1 rounded-full font-medium">
              {fabric.type}
            </span>
            <span className="text-xs bg-sand-100 text-sand-600 px-2.5 py-1 rounded-full font-medium">
              {fabric.color}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-sand-900 mb-2">{fabric.name}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-gold-600">
              {fabric.price_per_meter}
            </span>
            <span className="text-sm text-sand-500">ريال / المتر</span>
          </div>
        </div>

        {/* Stock bar */}
        <div className="bg-white rounded-xl border border-sand-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-sand-500">المخزون المتاح</span>
            <span className="text-xs font-medium text-sand-700">{fabric.quantity} متر</span>
          </div>
          <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                stockPercent > 50 ? 'bg-accent-400' : stockPercent > 20 ? 'bg-gold-400' : 'bg-red-400'
              }`}
              style={{ width: `${stockPercent}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-2">الوصف</h3>
          <p className="text-sm text-sand-700 leading-relaxed">{fabric.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">المواصفات</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'التركيبة', value: fabric.composition },
              { label: 'الملمس', value: fabric.texture },
              { label: 'اللون', value: fabric.color },
              { label: 'المناسبة', value: fabric.suitable_for },
              { label: 'النوع', value: fabric.type },
              { label: 'التوفر', value: fabric.availability },
            ].map((spec) => (
              <div key={spec.label} className="bg-white rounded-xl border border-sand-200 p-3">
                <p className="text-[11px] text-sand-500 mb-1">{spec.label}</p>
                <p className="text-xs font-medium text-sand-900">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">اختر الكمية</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setQuantityMode('meters')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                quantityMode === 'meters'
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-sand-100 text-sand-600'
              }`}
            >
              بالأمتار
            </button>
            <button
              onClick={() => setQuantityMode('thobes')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                quantityMode === 'thobes'
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-sand-100 text-sand-600'
              }`}
            >
              بالأثواب (ثلوب = {thobeMeters}م)
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
              className="w-12 h-12 flex items-center justify-center bg-sand-100 rounded-xl text-sand-700 active:bg-sand-200 transition-colors"
            >
              <i className="ri-subtract-line text-lg"></i>
            </button>
            <div className="flex-1">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                step={0.5}
                min={0.5}
                className="w-full text-center bg-sand-50 rounded-xl py-3 text-xl font-bold text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
              />
              <p className="text-xs text-sand-500 text-center mt-1">
                {quantityMode === 'meters' ? 'متر' : 'ثوب'} · {calculatedQuantity.toFixed(1)} متر إجمالاً
              </p>
            </div>
            <button
              onClick={() => setQuantity(quantity + 0.5)}
              className="w-12 h-12 flex items-center justify-center bg-sand-100 rounded-xl text-sand-700 active:bg-sand-200 transition-colors"
            >
              <i className="ri-add-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Similar Fabrics */}
        {similarFabrics.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-sand-900 text-sm">أقمشة مشابهة</h3>
              <Link to="/fabrics" className="text-xs text-gold-600 font-medium">
                الكل <i className="ri-arrow-left-line"></i>
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {similarFabrics.map((f) => (
                <Link
                  key={f.id}
                  to={`/fabric/${f.id}`}
                  className="group flex-shrink-0 w-[160px] bg-white rounded-2xl border border-sand-200 overflow-hidden active:scale-[0.98] transition-transform"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={f.images[0]}
                      alt={f.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 right-0 left-0 p-2.5">
                      <h4 className="font-display font-semibold text-white text-xs mb-0.5">{f.name}</h4>
                      <p className="text-white/90 text-[10px]">{f.price_per_meter} ريال/متر</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-sand-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-sand-500">السعر الإجمالي</p>
            <p className="font-display font-bold text-gold-700 text-xl">{totalPrice.toFixed(2)} ريال</p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 max-w-[240px] font-medium py-3 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              addedToCart
                ? 'bg-accent-500 text-white'
                : 'bg-gold-500 text-white active:bg-gold-600'
            }`}
          >
            {addedToCart ? (
              <>
                <i className="ri-check-line"></i>
                تمت الإضافة
              </>
            ) : (
              <>
                <i className="ri-shopping-bag-line"></i>
                أضف للسلة
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}