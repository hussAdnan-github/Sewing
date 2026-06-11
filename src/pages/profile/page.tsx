import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userProfile, type SavedMeasurements } from '@/mocks/user';
import { orders } from '@/mocks/orders';
import { statusMeta } from '@/mocks/orders';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userProfile);
  const [measurements, setMeasurements] = useState<SavedMeasurements>(
    userProfile.savedMeasurements
  );
  const [editingMeasurements, setEditingMeasurements] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const updateMeasurement = (
    key: keyof SavedMeasurements,
    delta: number
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: Math.max(1, prev[key] + delta),
    }));
  };

  const saveMeasurements = () => {
    setProfile((prev) => ({ ...prev, savedMeasurements: measurements }));
    setEditingMeasurements(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const measurementFields: {
    key: keyof SavedMeasurements;
    label: string;
    unit: string;
  }[] = [
    { key: 'totalLength', label: 'الطول الكلي', unit: 'سم' },
    { key: 'shoulderWidth', label: 'عرض الكتف', unit: 'سم' },
    { key: 'sleeveLength', label: 'طول اليد', unit: 'سم' },
    { key: 'wristWidth', label: 'عرض اليد (المعصم)', unit: 'سم' },
    { key: 'neckCircumference', label: 'دائرة الرقبة', unit: 'سم' },
    { key: 'chestWidth', label: 'عرض الصدر', unit: 'سم' },
    { key: 'bottomOpening', label: 'الخطوة (الفتحة السفلية)', unit: 'سم' },
  ];

  const recentOrders = orders.slice(0, 2);

  return (
    <div className="min-h-screen bg-sand-50 pt-4 pb-24">
      <div className="w-full px-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-200 flex-shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-bold text-sand-900 text-lg truncate">
                {profile.name}
              </h1>
              <p className="text-sm text-sand-500 flex items-center gap-1 mt-0.5">
                <i className="ri-phone-line text-xs"></i>
                {profile.phone}
              </p>
              <p className="text-sm text-sand-500 flex items-center gap-1">
                <i className="ri-map-pin-line text-xs"></i>
                {profile.city}
              </p>
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-sand-100 rounded-xl text-sand-600 active:bg-sand-200 transition-colors">
              <i className="ri-pencil-line"></i>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-sand-100">
            <div className="text-center">
              <p className="font-display font-bold text-sand-900 text-lg">
                {orders.length}
              </p>
              <p className="text-[11px] text-sand-500">طلباتي</p>
            </div>
            <div className="text-center border-x border-sand-100">
              <p className="font-display font-bold text-sand-900 text-lg">
                {orders.filter((o) => o.statusCode === 'delivered').length}
              </p>
              <p className="text-[11px] text-sand-500">منجز</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-sand-900 text-lg">
                2
              </p>
              <p className="text-[11px] text-sand-500">نشط</p>
            </div>
          </div>
        </div>

        {/* Saved Measurements */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-gold-50 rounded-lg">
                <i className="ri-ruler-line text-gold-600"></i>
              </div>
              <h2 className="font-display font-semibold text-sand-900 text-sm">
                مقاساتي المحفوظة
              </h2>
            </div>
            <button
              onClick={() =>
                editingMeasurements
                  ? saveMeasurements()
                  : setEditingMeasurements(true)
              }
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                editingMeasurements
                  ? 'bg-accent-500 text-white active:bg-accent-600'
                  : 'bg-sand-100 text-sand-700 active:bg-sand-200'
              }`}
            >
              {editingMeasurements ? (
                <span className="flex items-center gap-1">
                  <i className="ri-check-line"></i> حفظ
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <i className="ri-pencil-line"></i> تعديل
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {measurementFields.map((field) => (
              <div
                key={field.key}
                className={`rounded-xl p-3 ${
                  editingMeasurements
                    ? 'bg-sand-50 border border-sand-200'
                    : 'bg-sand-50'
                }`}
              >
                <p className="text-[11px] text-sand-500 mb-1">
                  {field.label}
                </p>
                {editingMeasurements ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateMeasurement(field.key, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-sand-700 active:bg-sand-200 transition-colors border border-sand-200"
                    >
                      <i className="ri-subtract-line text-xs"></i>
                    </button>
                    <input
                      type="number"
                      value={measurements[field.key]}
                      onChange={(e) =>
                        setMeasurements((prev) => ({
                          ...prev,
                          [field.key]: Math.max(
                            1,
                            parseFloat(e.target.value) || 0
                          ),
                        }))
                      }
                      className="flex-1 min-w-0 text-center bg-white rounded-md py-1 text-sm font-bold text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      onClick={() => updateMeasurement(field.key, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-sand-700 active:bg-sand-200 transition-colors border border-sand-200"
                    >
                      <i className="ri-add-line text-xs"></i>
                    </button>
                    <span className="text-[10px] text-sand-500 w-5">
                      {field.unit}
                    </span>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-sand-900">
                    {measurements[field.key]}{' '}
                    <span className="text-sm font-normal text-sand-500">
                      {field.unit}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {!editingMeasurements && (
            <p className="text-[11px] text-sand-400 mt-3 text-center">
              المقاسات المحفوظة تُستخدم تلقائياً عند تفصيل ثوب جديد
            </p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-accent-50 rounded-lg">
                <i className="ri-shopping-bag-3-line text-accent-600"></i>
              </div>
              <h2 className="font-display font-semibold text-sand-900 text-sm">
                آخر الطلبات
              </h2>
            </div>
            <Link
              to="/orders"
              className="text-xs text-gold-600 font-medium flex items-center gap-0.5"
            >
              الكل <i className="ri-arrow-left-line"></i>
            </Link>
          </div>

          <div className="space-y-2">
            {recentOrders.map((order) => {
              const meta = statusMeta[order.statusCode];
              return (
                <Link
                  key={order.id}
                  to="/orders"
                  className="flex items-center gap-3 p-3 bg-sand-50 rounded-xl active:bg-sand-100 transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-sand-200 flex-shrink-0">
                    <i className="ri-shopping-bag-3-line text-sand-400"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sand-900 truncate">
                      {order.id}
                    </p>
                    <p className="text-[11px] text-sand-500">
                      {order.createdAt} · {order.totalPrice.toFixed(0)} ريال
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${meta.bg} ${meta.text}`}
                  >
                    <i className={`${meta.icon} text-[10px]`}></i>
                    {meta.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Settings / Links */}
        <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden mb-6">
          <h3 className="font-display font-semibold text-sand-900 text-sm p-4 pb-2">
            الإعدادات
          </h3>
          <div className="divide-y divide-sand-100">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-right active:bg-sand-50 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg">
                <i className="ri-map-pin-line text-sand-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-900">
                  عناويني
                </p>
                <p className="text-[11px] text-sand-500">إدارة عناوين التوصيل</p>
              </div>
              <i className="ri-arrow-left-s-line text-sand-400"></i>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-right active:bg-sand-50 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg">
                <i className="ri-bank-card-line text-sand-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-900">
                  طرق الدفع
                </p>
                <p className="text-[11px] text-sand-500">إدارة البطاقات والمحافظ</p>
              </div>
              <i className="ri-arrow-left-s-line text-sand-400"></i>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-right active:bg-sand-50 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg">
                <i className="ri-notification-3-line text-sand-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-900">
                  الإشعارات
                </p>
                <p className="text-[11px] text-sand-500">تخصيص تنبيهات الطلبات</p>
              </div>
              <i className="ri-arrow-left-s-line text-sand-400"></i>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-right active:bg-sand-50 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center bg-sand-100 rounded-lg">
                <i className="ri-customer-service-2-line text-sand-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-900">
                  الدعم والمساعدة
                </p>
                <p className="text-[11px] text-sand-500">تواصل مع المحل</p>
              </div>
              <i className="ri-arrow-left-s-line text-sand-400"></i>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-200 text-red-600 font-medium text-sm active:bg-red-50 transition-colors mb-8">
          <i className="ri-logout-box-r-line"></i>
          تسجيل الخروج
        </button>
      </div>

      {/* Saved Toast */}
      {showSavedToast && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-fade-in">
          <div className="bg-accent-500 text-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2 justify-center">
            <i className="ri-checkbox-circle-line text-lg"></i>
            <span className="text-sm font-medium">
              تم حفظ المقاسات بنجاح
            </span>
          </div>
        </div>
      )}
    </div>
  );
}