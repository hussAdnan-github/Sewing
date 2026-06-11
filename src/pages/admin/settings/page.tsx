import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { adminSettings } from '@/mocks/admin';

export default function AdminSettings() {
  const [settings, setSettings] = useState(adminSettings);
  const [activeSection, setActiveSection] = useState<'general' | 'work' | 'delivery' | 'notifications'>('general');
  const [toast, setToast] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    setSaved(true);
    showToast('تم حفظ الإعدادات بنجاح');
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { key: 'general' as const, label: 'الإعدادات العامة', icon: 'ri-store-2-line' },
    { key: 'work' as const, label: 'أوقات الدوام', icon: 'ri-time-line' },
    { key: 'delivery' as const, label: 'التوصيل والأسعار', icon: 'ri-truck-line' },
    { key: 'notifications' as const, label: 'رسائل الإشعارات', icon: 'ri-notification-3-line' },
  ];

  return (
    <AdminLayout title="الإعدادات" subtitle="إدارة بيانات المحل والنظام">
      <div className="space-y-4">
        {/* Section tabs */}
        <div className="bg-white rounded-2xl border border-sand-200 p-1.5">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {sections.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all
                  ${activeSection === sec.key ? 'bg-primary-500 text-white' : 'text-sand-600 hover:bg-sand-50'}
                `}
              >
                <div className="w-4 h-4 flex items-center justify-center"><i className={sec.icon}></i></div>
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* General settings */}
        {activeSection === 'general' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-5 space-y-4">
            <h3 className="font-display font-bold text-sand-900 text-sm">بيانات المحل</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">اسم المحل</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">رقم التواصل</label>
                <input
                  type="text"
                  value={settings.storePhone}
                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">العنوان</label>
              <input
                type="text"
                value={settings.storeAddress}
                onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">العملة</label>
              <select
                value={settings.currency}
                onChange={(e) => {
                  const c = settings.availableCurrencies.find((x) => x.code === e.target.value);
                  if (c) {
                    setSettings({ ...settings, currency: c.code, currencySymbol: c.symbol, currencyLabel: c.label });
                  }
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
              >
                {settings.availableCurrencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.label} ({c.symbol})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">حد التنبيه للمخزون المنخفض</label>
              <input
                type="number"
                min={1}
                max={100}
                value={settings.lowStockThreshold}
                onChange={(e) => setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
              <p className="text-[10px] text-sand-500 mt-1">يتم التنبيه عندما يقل مخزون القماش عن هذا العدد</p>
            </div>
          </div>
        )}

        {/* Work hours */}
        {activeSection === 'work' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-5 space-y-4">
            <h3 className="font-display font-bold text-sand-900 text-sm">أوقات الدوام</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">وقت الفتح</label>
                <input
                  type="time"
                  value={settings.workHours.start}
                  onChange={(e) => setSettings({ ...settings, workHours: { ...settings.workHours, start: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">وقت الإغلاق</label>
                <input
                  type="time"
                  value={settings.workHours.end}
                  onChange={(e) => setSettings({ ...settings, workHours: { ...settings.workHours, end: e.target.value } })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-2">أيام العمل</label>
              <div className="flex flex-wrap gap-2">
                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const days = settings.workHours.days.includes(day)
                        ? settings.workHours.days.filter((d) => d !== day)
                        : [...settings.workHours.days, day];
                      setSettings({ ...settings, workHours: { ...settings.workHours, days } });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${settings.workHours.days.includes(day) ? 'bg-primary-500 text-white' : 'bg-sand-100 text-sand-500'}
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Delivery */}
        {activeSection === 'delivery' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-5 space-y-4">
            <h3 className="font-display font-bold text-sand-900 text-sm">رسوم التوصيل</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">داخل المدينة</label>
                <input
                  type="number"
                  value={settings.deliveryFee.sameCity}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: { ...settings.deliveryFee, sameCity: Number(e.target.value) } })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">المدن المجاورة</label>
                <input
                  type="number"
                  value={settings.deliveryFee.nearbyCities}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: { ...settings.deliveryFee, nearbyCities: Number(e.target.value) } })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1">المناطق البعيدة</label>
                <input
                  type="number"
                  value={settings.deliveryFee.remote}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: { ...settings.deliveryFee, remote: Number(e.target.value) } })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">الحد الأدنى للطلب</label>
              <input
                type="number"
                value={settings.minOrder}
                onChange={(e) => setSettings({ ...settings, minOrder: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-2xl border border-sand-200 p-5 space-y-4">
            <h3 className="font-display font-bold text-sand-900 text-sm">رسائل الإشعارات الآلية</h3>
            <p className="text-xs text-sand-500">هذه الرسائل يتم إرسالها تلقائياً للعملاء عند تغيّر حالة طلباتهم</p>
            {Object.entries(settings.notifications).map(([key, value]) => {
              const labels: Record<string, string> = {
                newOrder: 'عند استلام طلب جديد',
                assignedToTailor: 'عند تعيين الخياط',
                readyForPickup: 'عند جاهزية الطلب',
                outForDelivery: 'عند بدء التوصيل',
                delivered: 'عند التسليم النهائي',
              };
              return (
                <div key={key}>
                  <label className="text-xs font-medium text-sand-700 block mb-1">{labels[key] || key}</label>
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={value}
                    onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, [key]: e.target.value } })}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none resize-none"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all
              ${saved ? 'bg-accent-500 text-white' : 'bg-primary-500 text-white hover:bg-primary-600'}
            `}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={saved ? 'ri-check-line' : 'ri-save-line'}></i>
            </div>
            {saved ? 'تم الحفظ' : 'حفظ الإعدادات'}
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sand-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-slide-up">
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}