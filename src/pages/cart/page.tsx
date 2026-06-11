import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartItems as initialCartItems, shippingCost, type CartItem } from '@/mocks/cart';

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(0.5, item.quantity + delta);
        return { ...item, quantity: newQty };
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'smart10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand-50 pt-20 pb-24 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 flex items-center justify-center bg-sand-100 rounded-full mb-5">
          <i className="ri-shopping-basket-2-line text-4xl text-sand-400"></i>
        </div>
        <h2 className="font-display text-xl font-bold text-sand-900 mb-2">السلة فارغة</h2>
        <p className="text-sm text-sand-500 text-center mb-8 max-w-[260px]">
          لم تضف أي منتجات بعد. تصفح معرض الأقمشة أو ابدأ بتفصيل ثوبك الآن.
        </p>
        <div className="space-y-3 w-full max-w-xs">
          <Link
            to="/fabrics"
            className="block w-full text-center bg-accent-500 text-white font-medium py-3.5 rounded-xl active:bg-accent-600 transition-colors"
          >
            <i className="ri-t-shirt-line ml-2"></i>
            تصفح الأقمشة
          </Link>
          <Link
            to="/tailoring"
            className="block w-full text-center bg-gold-500 text-white font-medium py-3.5 rounded-xl active:bg-gold-600 transition-colors"
          >
            <i className="ri-scissors-line ml-2"></i>
            ابدأ التفصيل
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 pt-16 pb-40">
      <div className="w-full px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-display text-2xl font-bold text-sand-900">السلة</h1>
          <span className="text-sm text-sand-500 bg-sand-100 px-3 py-1 rounded-full">
            {items.length} منتجات
          </span>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-sand-200 p-3 flex gap-3 animate-fade-in"
            >
              <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-sand-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
                {item.type === 'tailoring' && (
                  <div className="absolute top-1 left-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                    <i className="ri-scissors-line text-white text-xs"></i>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-sand-900 text-sm leading-tight truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 flex items-center justify-center text-sand-400 hover:text-red-500 active:text-red-600 transition-colors flex-shrink-0"
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                  <p className="text-xs text-sand-500 mt-1">{item.details}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -0.5)}
                      className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg text-sand-700 active:bg-sand-200 transition-colors"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="text-sm font-bold text-sand-900 w-12 text-center">
                      {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)} {item.unit}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 0.5)}
                      className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg text-sand-700 active:bg-sand-200 transition-colors"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                  <p className="font-display font-bold text-gold-600 text-sm">
                    {(item.price * item.quantity).toFixed(0)} ريال
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4">
          <label className="text-xs font-medium text-sand-500 mb-2 block">كود الخصم</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="أدخل الكود (جرب: SMART10)"
              className="flex-1 bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
            />
            <button
              onClick={applyPromo}
              className="px-4 py-2.5 bg-gold-500 text-white rounded-xl text-sm font-medium active:bg-gold-600 transition-colors whitespace-nowrap"
            >
              تطبيق
            </button>
          </div>
          {promoApplied && (
            <p className="text-xs text-accent-600 mt-2 flex items-center gap-1">
              <i className="ri-check-line"></i>
              تم تطبيق خصم 10%
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">ملخص الطلب</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-sand-600">المجموع الفرعي</span>
              <span className="text-sand-900">{subtotal.toFixed(0)} ريال</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-600">التوصيل</span>
              <span className="text-sand-900">{shippingCost} ريال</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-accent-600">الخصم</span>
                <span className="text-accent-600">-{discount.toFixed(0)} ريال</span>
              </div>
            )}
            <div className="border-t border-sand-200 pt-2 flex justify-between">
              <span className="font-semibold text-sand-900">الإجمالي</span>
              <span className="font-display font-bold text-gold-700 text-lg">{total.toFixed(0)} ريال</span>
            </div>
          </div>
        </div>

        {/* Saved Addresses hint */}
        <div className="bg-accent-50 rounded-2xl p-4 flex items-start gap-3 mb-6">
          <div className="w-8 h-8 flex items-center justify-center bg-accent-100 rounded-lg flex-shrink-0">
            <i className="ri-map-pin-line text-accent-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-sand-900">عنوان التوصيل</p>
            <p className="text-xs text-sand-600 mt-0.5">حي الروضة، شارع الملك فهد، الرياض</p>
          </div>
          <button className="text-xs text-gold-600 font-medium mr-auto">تغيير</button>
        </div>
      </div>

      {/* Sticky Checkout Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-sand-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-sand-500">الإجمالي</p>
            <p className="font-display font-bold text-gold-700 text-lg">{total.toFixed(0)} ريال</p>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 max-w-[200px] bg-accent-500 text-white font-medium py-3 rounded-xl active:bg-accent-600 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-secure-payment-line"></i>
            إتمام الطلب
          </button>
        </div>
      </div>
    </div>
  );
}