import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { orders, statusMeta } from '@/mocks/orders';
import { fabrics } from '@/mocks/fabrics';
import { styles } from '@/mocks/styles';

type Tab = 'active' | 'past';

export default function Orders() {
  const [tab, setTab] = useState<Tab>('active');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const activeStatuses = ['in_progress', 'ready'];
  const pastStatuses = ['delivered', 'cancelled'];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) =>
      tab === 'active'
        ? activeStatuses.includes(o.statusCode)
        : pastStatuses.includes(o.statusCode)
    );
  }, [tab]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const fabric = selectedOrder
    ? fabrics.find((f) => f.id === selectedOrder.fabricId)
    : null;
  const style = selectedOrder
    ? styles.find((s) => s.id === selectedOrder.styleId)
    : null;

  return (
    <div className="min-h-screen bg-sand-50 pt-4 pb-24">
      <div className="w-full px-4">
        {/* Header */}
        <div className="mb-5">
          <h1 className="font-display text-2xl font-bold text-sand-900 mb-1">
            طلباتي
          </h1>
          <p className="text-sm text-sand-600">
            تابع طلباتك النشطة واطلع على سجل طلباتك السابقة
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl border border-sand-200 p-1 mb-5">
          <button
            onClick={() => setTab('active')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all text-center ${
              tab === 'active'
                ? 'bg-accent-500 text-white shadow-sm'
                : 'text-sand-600'
            }`}
          >
            النشطة
          </button>
          <button
            onClick={() => setTab('past')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all text-center ${
              tab === 'past'
                ? 'bg-accent-500 text-white shadow-sm'
                : 'text-sand-600'
            }`}
          >
            السابقة
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const fabricImg = fabrics.find((f) => f.id === order.fabricId)?.images[0];
            const styleName = styles.find((s) => s.id === order.styleId)?.name;
            const meta = statusMeta[order.statusCode];

            return (
              <button
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className="w-full text-right bg-white rounded-2xl border border-sand-200 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  {/* Fabric Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-sand-100">
                    {fabricImg ? (
                      <img
                        src={fabricImg}
                        alt="القماش"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-t-shirt-line text-sand-400 text-lg"></i>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-sand-500">
                        {order.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${meta.bg} ${meta.text}`}
                      >
                        <i className={`${meta.icon} text-[10px]`}></i>
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-sand-900 truncate mb-1">
                      {styleName}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-sand-500">
                      <span>
                        <i className="ri-calendar-line ml-1"></i>
                        {order.createdAt}
                      </span>
                      <span className="font-bold text-gold-600">
                        {order.totalPrice.toFixed(0)} ريال
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="w-6 h-6 flex items-center justify-center text-sand-300 mt-2">
                    <i className="ri-arrow-left-s-line"></i>
                  </div>
                </div>

                {/* Progress bar for active orders */}
                {activeStatuses.includes(order.statusCode) && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-sand-500 mb-1">
                      <span>التقدم</span>
                      <span>{order.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-full transition-all"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-sand-100 rounded-full">
              <i className="ri-shopping-bag-3-line text-3xl text-sand-400"></i>
            </div>
            <p className="text-sand-500 text-sm">
              {tab === 'active'
                ? 'لا توجد طلبات نشطة حالياً'
                : 'لا توجد طلبات سابقة'}
            </p>
            <Link
              to="/tailoring"
              className="inline-block mt-4 text-sm text-gold-600 font-medium"
            >
              ابدأ تفصيل ثوب جديد <i className="ri-arrow-left-line"></i>
            </Link>
          </div>
        )}
      </div>

      {/* Order Detail Bottom Sheet */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center animate-fade-in"
          onClick={() => setSelectedOrderId(null)}
        >
          <div
            className="bg-white w-full rounded-t-3xl max-h-[92vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-sand-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 pt-2 pb-4 flex items-center justify-between border-b border-sand-100">
              <div>
                <p className="text-xs text-sand-500">{selectedOrder.id}</p>
                <p className="font-display font-bold text-sand-900 text-lg">
                  تفاصيل الطلب
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="w-9 h-9 flex items-center justify-center bg-sand-100 rounded-full text-sand-600 active:bg-sand-200 transition-colors"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            {/* Status Badge */}
            <div className="px-5 py-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  statusMeta[selectedOrder.statusCode].bg
                } ${statusMeta[selectedOrder.statusCode].text}`}
              >
                <i
                  className={`${statusMeta[selectedOrder.statusCode].icon}`}
                ></i>
                {statusMeta[selectedOrder.statusCode].label}
              </div>
            </div>

            {/* Timeline */}
            {activeStatuses.includes(selectedOrder.statusCode) && (
              <div className="px-5 py-3 bg-sand-50 mx-5 rounded-2xl mb-4">
                <div className="flex items-center justify-between text-xs text-sand-500 mb-2">
                  <span>التقدم</span>
                  <span className="font-bold text-accent-600">
                    {selectedOrder.progress}%
                  </span>
                </div>
                <div className="h-2 bg-sand-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-500 rounded-full transition-all"
                    style={{ width: `${selectedOrder.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-sand-400">
                  <span>تم الاستلام</span>
                  <span>قيد التفصيل</span>
                  <span>جاهز</span>
                </div>
              </div>
            )}

            {/* Fabric & Style */}
            <div className="px-5 space-y-4 mb-4">
              <h3 className="font-display font-semibold text-sand-900 text-sm">
                تفاصيل الثوب
              </h3>

              {fabric && (
                <div className="flex items-center gap-3 bg-white rounded-xl border border-sand-200 p-3">
                  <img
                    src={fabric.images[0]}
                    alt={fabric.name}
                    className="w-14 h-14 rounded-xl object-cover object-top"
                  />
                  <div>
                    <p className="text-sm font-medium text-sand-900">
                      {fabric.name}
                    </p>
                    <p className="text-xs text-sand-500">
                      {fabric.type} · {fabric.composition}
                    </p>
                  </div>
                </div>
              )}

              {style && (
                <div className="bg-sand-50 rounded-xl p-3">
                  <p className="text-xs text-sand-500 mb-1">الطراز</p>
                  <p className="text-sm font-semibold text-sand-900">
                    {style.name}
                  </p>
                  <p className="text-xs text-sand-600 mt-0.5">
                    {style.description}
                  </p>
                </div>
              )}
            </div>

            {/* Measurements */}
            <div className="px-5 mb-4">
              <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">
                المقاسات
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'الطول الكلي', val: selectedOrder.measurements.totalLength, unit: 'سم' },
                  { label: 'عرض الكتف', val: selectedOrder.measurements.shoulderWidth, unit: 'سم' },
                  { label: 'طول اليد', val: selectedOrder.measurements.sleeveLength, unit: 'سم' },
                  { label: 'عرض المعصم', val: selectedOrder.measurements.wristWidth, unit: 'سم' },
                  { label: 'دائرة الرقبة', val: selectedOrder.measurements.neckCircumference, unit: 'سم' },
                  { label: 'عرض الصدر', val: selectedOrder.measurements.chestWidth, unit: 'سم' },
                  { label: 'الفتحة السفلية', val: selectedOrder.measurements.bottomOpening, unit: 'سم' },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-sand-50 rounded-xl p-2.5 text-center"
                  >
                    <p className="text-[10px] text-sand-500 mb-0.5">
                      {m.label}
                    </p>
                    <p className="text-sm font-bold text-sand-900">
                      {m.val} {m.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="px-5 mb-4">
              <h3 className="font-display font-semibold text-sand-900 text-sm mb-3">
                تفاصيل التفصيل
              </h3>
              <div className="bg-white rounded-xl border border-sand-200 p-3 space-y-2">
                {[
                  { label: 'الرقبة', val: selectedOrder.details.collar },
                  { label: 'الجيب', val: selectedOrder.details.pocket },
                  { label: 'السحاب', val: selectedOrder.details.zipper },
                  { label: 'الأزرار', val: selectedOrder.details.button },
                  { label: 'الكم', val: selectedOrder.details.cuff },
                  { label: 'لون الخيط', val: selectedOrder.details.threadColor },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-sand-500">{d.label}</span>
                    <span className="text-sand-900 font-medium">
                      {d.val}
                    </span>
                  </div>
                ))}
                {selectedOrder.details.embroidery && (
                  <div className="pt-2 border-t border-sand-100">
                    <p className="text-xs text-sand-500 mb-1">التطريز</p>
                    <p className="text-xs text-sand-900 font-medium">
                      {selectedOrder.details.embroideryPosition} ·{' '}
                      {selectedOrder.details.embroideryPattern}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Dates */}
            <div className="px-5 pb-6">
              <div className="bg-gold-50 rounded-2xl p-4 border border-gold-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sand-600">تاريخ الطلب</span>
                  <span className="text-sm font-medium text-sand-900">
                    {selectedOrder.createdAt}
                  </span>
                </div>
                {'estimatedDelivery' in selectedOrder && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sand-600">
                      موعد التسليم المتوقع
                    </span>
                    <span className="text-sm font-medium text-accent-600">
                      {selectedOrder.estimatedDelivery}
                    </span>
                  </div>
                )}
                {'deliveredAt' in selectedOrder && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sand-600">تاريخ التسليم</span>
                    <span className="text-sm font-medium text-green-600">
                      {selectedOrder.deliveredAt}
                    </span>
                  </div>
                )}
                <div className="border-t border-gold-200 pt-2 flex items-center justify-between">
                  <span className="font-semibold text-sand-900">
                    الإجمالي
                  </span>
                  <span className="font-display font-bold text-gold-700 text-xl">
                    {selectedOrder.totalPrice.toFixed(0)} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}