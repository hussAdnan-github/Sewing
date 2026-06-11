import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { recentOrders } from '@/mocks/admin';
import { fabrics } from '@/mocks/fabrics';
import { styles } from '@/mocks/styles';

const statusOptions = [
  { code: 'all', label: 'الكل' },
  { code: 'in_progress', label: 'جاري التفصيل' },
  { code: 'ready', label: 'جاهز للاستلام' },
  { code: 'delivered', label: 'تم التسليم' },
  { code: 'cancelled', label: 'ملغي' },
];

const statusColors: Record<string, string> = {
  in_progress: 'bg-accent-500 text-white',
  ready: 'bg-gold-500 text-white',
  delivered: 'bg-green-500 text-white',
  cancelled: 'bg-red-500 text-white',
};

const statusNext: Record<string, string> = {
  in_progress: 'ready',
  ready: 'delivered',
};

const statusNextLabel: Record<string, string> = {
  in_progress: 'تحديد كـ جاهز',
  ready: 'تحديد كـ مُسلَّم',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(recentOrders);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesStatus = filter === 'all' || o.statusCode === filter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    return matchesStatus && matchesSearch;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const advanceStatus = (orderId: string) => {
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === orderId);
      if (idx < 0) return prev;
      const order = prev[idx];
      const nextCode = statusNext[order.statusCode];
      if (!nextCode) return prev;
      const nextLabel = statusOptions.find((s) => s.code === nextCode)?.label || nextCode;
      const next = [...prev];
      next[idx] = { ...order, statusCode: nextCode, status: nextLabel, progress: nextCode === 'ready' ? 95 : 100 };
      return next;
    });
    showToast('تم تحديث حالة الطلب');
  };

  return (
    <AdminLayout title="الطلبات" subtitle="إدارة ومتابعة جميع طلبات التفصيل">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-sand-400"></i>
            </div>
            <input
              type="text"
              placeholder="ابحث برقم الطلب أو اسم العميل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {statusOptions.map((opt) => {
              const count = opt.code === 'all' ? orders.length : orders.filter((o) => o.statusCode === opt.code).length;
              return (
                <button
                  key={opt.code}
                  onClick={() => setFilter(opt.code)}
                  className={`text-[10px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap
                    ${filter === opt.code ? 'bg-primary-500 text-white font-semibold' : 'bg-sand-100 text-sand-600 hover:bg-sand-200'}
                  `}
                >
                  {opt.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-200">
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">رقم الطلب</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">العميل</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase hidden md:table-cell">القماش</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase hidden md:table-cell">الطراز</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">الحالة</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">المبلغ</th>
                  <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const fabricInfo = fabrics.find((f) => f.id === order.fabricId);
                  const styleInfo = styles.find((s) => s.id === order.styleId);
                  return (
                    <tr key={order.id} className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-sand-800 font-semibold whitespace-nowrap">{order.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700">
                            {order.customerName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-sand-800">{order.customerName}</p>
                            <p className="text-[10px] text-sand-500" dir="ltr">{order.customerPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {fabricInfo && (
                            <img src={fabricInfo.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover object-top" />
                          )}
                          <span className="text-xs text-sand-700">{fabricInfo?.name || order.fabricId}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-sand-600 hidden md:table-cell">{styleInfo?.name || order.styleId}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-[10px] px-2 py-1 rounded-full font-medium ${statusColors[order.statusCode] || 'bg-sand-200 text-sand-700'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-sand-800 font-semibold whitespace-nowrap">{order.totalPrice} ر.س</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 text-sand-500 hover:text-primary-600"
                            title="عرض التفاصيل"
                          >
                            <i className="ri-eye-line text-sm"></i>
                          </button>
                          {statusNext[order.statusCode] && (
                            <button
                              onClick={() => advanceStatus(order.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent-50 text-sand-500 hover:text-accent-600"
                              title={statusNextLabel[order.statusCode]}
                            >
                              <i className="ri-arrow-right-circle-line text-sm"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="w-14 h-14 flex items-center justify-center bg-sand-100 rounded-full mx-auto mb-3">
                <i className="ri-shopping-bag-3-line text-xl text-sand-400"></i>
              </div>
              <p className="text-sm text-sand-600">لا توجد طلبات تطابق الفلاتر</p>
            </div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-sand-200 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-sand-900 text-sm">{selectedOrder.id}</h2>
                <p className="text-[10px] text-sand-500 mt-0.5">{selectedOrder.createdAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusColors[selectedOrder.statusCode]}`}>
                  {selectedOrder.status}
                </span>
                <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100">
                  <i className="ri-close-line text-lg text-sand-500"></i>
                </button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              {/* Customer info */}
              <div>
                <h4 className="text-xs font-bold text-sand-700 mb-2">معلومات العميل</h4>
                <div className="bg-sand-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-sand-800">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-user-line text-sand-400"></i></div>
                    {selectedOrder.customerName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sand-800" dir="ltr">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-phone-line text-sand-400"></i></div>
                    {selectedOrder.customerPhone}
                  </div>
                </div>
              </div>

              {/* Fabric & Style */}
              <div>
                <h4 className="text-xs font-bold text-sand-700 mb-2">القماش والطراز</h4>
                <div className="flex gap-3">
                  {(() => {
                    const f = fabrics.find((x) => x.id === selectedOrder.fabricId);
                    const s = styles.find((x) => x.id === selectedOrder.styleId);
                    return (
                      <>
                        {f && (
                          <div className="flex items-center gap-2 bg-sand-50 rounded-xl p-3 flex-1">
                            <img src={f.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover object-top" />
                            <div>
                              <p className="text-xs font-medium text-sand-800">{f.name}</p>
                              <p className="text-[10px] text-sand-500">{f.type} · {f.price_per_meter} ر.س/م</p>
                            </div>
                          </div>
                        )}
                        {s && (
                          <div className="flex items-center gap-2 bg-sand-50 rounded-xl p-3 flex-1">
                            <img src={s.image} alt="" className="w-10 h-10 rounded-lg object-cover object-top" />
                            <div>
                              <p className="text-xs font-medium text-sand-800">{s.name}</p>
                              <p className="text-[10px] text-sand-500">{s.country}</p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Measurements */}
              <div>
                <h4 className="text-xs font-bold text-sand-700 mb-2">المقاسات</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedOrder.measurements).map(([key, val]) => {
                    const labels: Record<string, string> = {
                      totalLength: 'الطول الكلي',
                      shoulderWidth: 'عرض الكتف',
                      sleeveLength: 'طول الكم',
                      wristWidth: 'محيط المعصم',
                      neckCircumference: 'محيط الرقبة',
                      chestWidth: 'عرض الصدر',
                      bottomOpening: 'عرض الفتحة السفلية',
                    };
                    return (
                      <div key={key} className="bg-sand-50 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] text-sand-500">{labels[key] || key}</span>
                        <span className="text-xs font-semibold text-sand-800">{val} سم</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-xs font-bold text-sand-700 mb-2">تفاصيل التفصيل</h4>
                <div className="bg-sand-50 rounded-xl p-4 space-y-2">
                  {Object.entries(selectedOrder.details).map(([key, val]) => {
                    if (typeof val === 'boolean') return null;
                    const labels: Record<string, string> = {
                      collar: 'الطوق',
                      pocket: 'الجيب',
                      zipper: 'السحاب',
                      button: 'الأزرار',
                      cuff: 'الكم',
                      threadColor: 'لون الخيط',
                      embroideryPosition: 'موقع التطريز',
                      embroideryPattern: 'نموذج التطريز',
                    };
                    return (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-sand-500">{labels[key] || key}</span>
                        <span className="text-sand-800 font-medium">{String(val)}</span>
                      </div>
                    );
                  })}
                  {selectedOrder.details.embroidery && (
                    <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-gold-100 text-gold-700 font-medium">
                      يحتوي على تطريز
                    </span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-sand-200">
                <span className="text-sm font-bold text-sand-900">المجموع</span>
                <span className="text-lg font-display font-bold text-primary-600">{selectedOrder.totalPrice} ر.س</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {statusNext[selectedOrder.statusCode] && (
                  <button
                    onClick={() => {
                      advanceStatus(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
                  >
                    {statusNextLabel[selectedOrder.statusCode]}
                  </button>
                )}
                <button
                  onClick={() => {
                    showToast('تم طباعة ورقة الطلب');
                  }}
                  className="px-5 py-3 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium hover:bg-sand-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <i className="ri-printer-line"></i>
                    طباعة
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sand-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-slide-up">
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}