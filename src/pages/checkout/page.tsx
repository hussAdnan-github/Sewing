import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartItems as initialCartItems, shippingCost, type CartItem } from '@/mocks/cart';

interface AddressForm {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  building: string;
  apartment: string;
  notes: string;
}

const defaultAddress: AddressForm = {
  fullName: 'أحمد محمد العتيبي',
  phone: '0501234567',
  city: 'الرياض',
  district: 'حي الروضة',
  street: 'شارع الملك فهد',
  building: 'برج النخيل',
  apartment: 'الدور 3، شقة 301',
  notes: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const [items] = useState<CartItem[]>(initialCartItems);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cod'>('cod');
  const [address, setAddress] = useState<AddressForm>(defaultAddress);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState('ORD-' + Math.floor(100000 + Math.random() * 900000));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? shippingCost : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-sand-50 pt-20 pb-24 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 flex items-center justify-center bg-accent-50 rounded-full mb-5">
          <i className="ri-checkbox-circle-line text-5xl text-accent-500"></i>
        </div>
        <h2 className="font-display text-2xl font-bold text-sand-900 mb-2">تم تأكيد طلبك!</h2>
        <p className="text-sm text-sand-500 text-center mb-6 max-w-[280px]">
          سيتم التواصل معك قريباً لتأكيد التفاصيل. شكراً لثقتك بنا.
        </p>

        <div className="bg-white rounded-2xl border border-sand-200 p-5 w-full max-w-xs mb-8 text-center">
          <p className="text-xs text-sand-500 mb-1">رقم الطلب</p>
          <p className="font-display font-bold text-sand-900 text-lg tracking-wider mb-4">{orderNumber}</p>
          <div className="border-t border-sand-200 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-sand-600">المجموع</span>
              <span className="font-semibold text-sand-900">{total.toFixed(0)} ريال</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-600">طريقة الدفع</span>
              <span className="text-sand-900">
                {paymentMethod === 'card' ? 'بطاقة ائتمان' : paymentMethod === 'wallet' ? 'محفظة إلكترونية' : 'الدفع عند الاستلام'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-600">التوصيل</span>
              <span className="text-sand-900">{deliveryMethod === 'delivery' ? 'توصيل للمنزل' : 'استلام من المحل'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full max-w-xs">
          <Link
            to="/orders"
            className="block w-full text-center bg-accent-500 text-white font-medium py-3.5 rounded-xl active:bg-accent-600 transition-colors"
          >
            <i className="ri-shopping-bag-3-line ml-2"></i>
            متابعة الطلب
          </Link>
          <Link
            to="/"
            className="block w-full text-center bg-sand-100 text-sand-700 font-medium py-3.5 rounded-xl active:bg-sand-200 transition-colors"
          >
            <i className="ri-home-5-line ml-2"></i>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 pt-16 pb-40">
      <div className="w-full px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="w-9 h-9 flex items-center justify-center bg-white rounded-xl border border-sand-200 text-sand-700 active:bg-sand-50 transition-colors"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
          <h1 className="font-display text-2xl font-bold text-sand-900">إتمام الطلب</h1>
        </div>

        {/* Order Summary (collapsed) */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">ملخص الطلب</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-sand-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sand-900 truncate">{item.name}</p>
                  <p className="text-[11px] text-sand-500">
                    {item.quantity} {item.unit} × {item.price} ريال
                  </p>
                </div>
                <p className="text-sm font-bold text-gold-600">{(item.price * item.quantity).toFixed(0)} ريال</p>
              </div>
            ))}
          </div>
          <div className="border-t border-sand-200 mt-3 pt-3 flex justify-between">
            <span className="text-sm font-semibold text-sand-900">المجموع</span>
            <span className="font-display font-bold text-gold-700">{subtotal.toFixed(0)} ريال</span>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">طريقة الاستلام</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setDeliveryMethod('delivery')}
              className={`flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 border-2 ${
                deliveryMethod === 'delivery'
                  ? 'border-accent-500 bg-accent-50 text-accent-600'
                  : 'border-sand-200 bg-sand-50 text-sand-600'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-truck-line text-lg"></i>
              </div>
              <span>توصيل للمنزل</span>
              <span className="text-[10px] opacity-75">{shippingCost} ريال</span>
            </button>
            <button
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 border-2 ${
                deliveryMethod === 'pickup'
                  ? 'border-accent-500 bg-accent-50 text-accent-600'
                  : 'border-sand-200 bg-sand-50 text-sand-600'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-store-2-line text-lg"></i>
              </div>
              <span>استلام من المحل</span>
              <span className="text-[10px] opacity-75">مجاناً</span>
            </button>
          </div>
        </div>

        {/* Address Form */}
        {deliveryMethod === 'delivery' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4 animate-fade-in">
            <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">عنوان التوصيل</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-sand-500 mb-1 block">الاسم الكامل</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="text-xs text-sand-500 mb-1 block">رقم الجوال</label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  dir="ltr"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-sand-500 mb-1 block">المدينة</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-sand-500 mb-1 block">الحي</label>
                  <input
                    type="text"
                    value={address.district}
                    onChange={(e) => setAddress({ ...address, district: e.target.value })}
                    className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-sand-500 mb-1 block">الشارع</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-sand-500 mb-1 block">المبنى</label>
                  <input
                    type="text"
                    value={address.building}
                    onChange={(e) => setAddress({ ...address, building: e.target.value })}
                    className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-sand-500 mb-1 block">الشقة / الدور</label>
                  <input
                    type="text"
                    value={address.apartment}
                    onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                    className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-sand-500 mb-1 block">ملاحظات للسائق (اختياري)</label>
                <textarea
                  value={address.notes}
                  onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                  placeholder="مثال: بجانب مسجد النور، جرس باب 301"
                  maxLength={200}
                  rows={2}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400 resize-none"
                />
                <p className="text-[10px] text-sand-400 mt-1">{address.notes.length}/200</p>
              </div>
            </div>
          </div>
        )}

        {deliveryMethod === 'pickup' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4 animate-fade-in">
            <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">معلومات الاستلام</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-sand-500 mb-1 block">الاسم الكامل</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                />
              </div>
              <div>
                <label className="text-xs text-sand-500 mb-1 block">رقم الجوال</label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-sand-50 rounded-xl px-4 py-2.5 text-sm text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="mt-4 bg-gold-50 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gold-100 rounded-lg flex-shrink-0">
                <i className="ri-map-pin-2-line text-gold-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-sand-900">عنوان المحل</p>
                <p className="text-xs text-sand-600 mt-0.5 leading-relaxed">
                  شارع العليا العام، حي العليا، الرياض 12214
                  <br />
                  فوق صيدلية النهدي، الدور الأول
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-4">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">طريقة الدفع</h3>
          <div className="space-y-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-accent-500 bg-accent-50'
                  : 'border-sand-200 bg-sand-50'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-sand-200">
                <i className={`ri-bank-card-line text-xl ${paymentMethod === 'card' ? 'text-accent-500' : 'text-sand-500'}`}></i>
              </div>
              <div className="text-right flex-1">
                <p className="text-sm font-medium text-sand-900">بطاقة ائتمان / مدى</p>
                <p className="text-[11px] text-sand-500">Visa, Mastercard, Mada</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-accent-500' : 'border-sand-300'
              }`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-accent-500 rounded-full" />}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-accent-500 bg-accent-50'
                  : 'border-sand-200 bg-sand-50'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-sand-200">
                <i className={`ri-wallet-3-line text-xl ${paymentMethod === 'wallet' ? 'text-accent-500' : 'text-sand-500'}`}></i>
              </div>
              <div className="text-right flex-1">
                <p className="text-sm font-medium text-sand-900">محفظة إلكترونية</p>
                <p className="text-[11px] text-sand-500">Apple Pay, STC Pay, مدى باي</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'wallet' ? 'border-accent-500' : 'border-sand-300'
              }`}>
                {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-accent-500 rounded-full" />}
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('cod')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                paymentMethod === 'cod'
                  ? 'border-accent-500 bg-accent-50'
                  : 'border-sand-200 bg-sand-50'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-sand-200">
                <i className={`ri-hand-coin-line text-xl ${paymentMethod === 'cod' ? 'text-accent-500' : 'text-sand-500'}`}></i>
              </div>
              <div className="text-right flex-1">
                <p className="text-sm font-medium text-sand-900">الدفع عند الاستلام</p>
                <p className="text-[11px] text-sand-500">ادفع نقداً عند استلام طلبك</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'cod' ? 'border-accent-500' : 'border-sand-300'
              }`}>
                {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-accent-500 rounded-full" />}
              </div>
            </button>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-white rounded-2xl border border-sand-200 p-4 mb-6">
          <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">الفاتورة</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-sand-600">المجموع الفرعي</span>
              <span className="text-sand-900">{subtotal.toFixed(0)} ريال</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between">
                <span className="text-sand-600">التوصيل</span>
                <span className="text-sand-900">{shippingCost} ريال</span>
              </div>
            )}
            {deliveryMethod === 'pickup' && (
              <div className="flex justify-between">
                <span className="text-sand-600">التوصيل</span>
                <span className="text-accent-600 font-medium">مجاناً</span>
              </div>
            )}
            <div className="border-t border-sand-200 pt-2 flex justify-between">
              <span className="font-semibold text-sand-900">الإجمالي</span>
              <span className="font-display font-bold text-gold-700 text-lg">{total.toFixed(0)} ريال</span>
            </div>
          </div>
          <p className="text-[11px] text-sand-400 mt-3 text-center">
            بالضغط على "تأكيد الطلب" فإنك توافق على شروط الخدمة وسياسة الإرجاع
          </p>
        </div>
      </div>

      {/* Sticky Place Order Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-sand-200 px-4 py-3 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-sand-500">الإجمالي</p>
            <p className="font-display font-bold text-gold-700 text-lg">{total.toFixed(0)} ريال</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="flex-1 max-w-[220px] bg-accent-500 text-white font-medium py-3 rounded-xl active:bg-accent-600 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-shield-check-line"></i>
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  );
}