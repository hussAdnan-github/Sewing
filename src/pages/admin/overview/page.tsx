import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { adminStats, dailyOrders, orderStyleDistribution, topFabrics, recentOrders } from '@/mocks/admin';
import { fabrics } from '@/mocks/fabrics';
import { styles } from '@/mocks/styles';

function StatCard({ icon, label, value, subtext, color }: { icon: string; label: string; value: string; subtext: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    gold: 'bg-gold-50 text-gold-600',
    red: 'bg-red-50 text-red-600',
  };
  const bgClass = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-white rounded-2xl p-5 border border-sand-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${bgClass}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <span className="text-[10px] text-sand-500 bg-sand-100 px-2 py-0.5 rounded-full">اليوم</span>
      </div>
      <p className="text-2xl font-display font-bold text-sand-900">{value}</p>
      <p className="text-sm text-sand-600 mt-1">{label}</p>
      <p className="text-xs text-sand-400 mt-2">{subtext}</p>
    </div>
  );
}

function MiniBarChart() {
  const maxRevenue = Math.max(...dailyOrders.map(d => d.revenue));

  return (
    <div className="bg-white rounded-2xl p-5 border border-sand-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-bold text-sand-900 text-sm">منحنى الطلبات والإيرادات</h3>
          <p className="text-xs text-sand-500 mt-1">آخر 10 أيام</p>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-500"></span>الطلبات</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold-400"></span>الإيرادات</span>
        </div>
      </div>
      <div className="flex items-end gap-2 h-40">
        {dailyOrders.map((day) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-sm bg-gold-400/40"
                style={{ height: `${(day.revenue / maxRevenue) * 100}px` }}
              />
              <div
                className="w-full rounded-t-sm bg-primary-500"
                style={{ height: `${(day.orders / Math.max(...dailyOrders.map(d => d.orders))) * 60}px` }}
              />
            </div>
            <span className="text-[10px] text-sand-400 mt-1">{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StyleDistributionChart() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-sand-200">
      <h3 className="font-display font-bold text-sand-900 text-sm mb-4">توزيع الطلبات حسب الطراز</h3>
      <div className="space-y-3">
        {orderStyleDistribution.map((item) => (
          <div key={item.style}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-sand-700">الثوب {item.style}</span>
              <span className="text-sand-500">{item.count} طلب</span>
            </div>
            <div className="w-full h-2 bg-sand-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopFabricsTable() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-sand-200">
      <h3 className="font-display font-bold text-sand-900 text-sm mb-4">الأقمشة الأكثر طلبًا</h3>
      <div className="space-y-3">
        {topFabrics.map((fabric, idx) => {
          const fabricInfo = fabrics.find(f => f.id === fabric.id);
          return (
            <div key={fabric.id} className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-sand-100 text-xs font-bold text-sand-600">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-800">{fabric.name}</p>
                <p className="text-[10px] text-sand-500">{fabric.orders} طلب · {fabric.revenue} ر.س</p>
              </div>
              {fabricInfo && (
                <img
                  src={fabricInfo.images[0]}
                  alt={fabric.name}
                  className="w-10 h-10 rounded-lg object-cover object-top"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentOrdersTable() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? recentOrders.slice(0, 5)
    : recentOrders.filter(o => o.statusCode === filter).slice(0, 5);

  const statusFilterOptions = [
    { value: 'all', label: 'الكل', count: recentOrders.length },
    { value: 'in_progress', label: 'جاري', count: recentOrders.filter(o => o.statusCode === 'in_progress').length },
    { value: 'ready', label: 'جاهز', count: recentOrders.filter(o => o.statusCode === 'ready').length },
    { value: 'delivered', label: 'مُسلَّم', count: recentOrders.filter(o => o.statusCode === 'delivered').length },
    { value: 'cancelled', label: 'ملغى', count: recentOrders.filter(o => o.statusCode === 'cancelled').length },
  ];

  const statusColors: Record<string, string> = {
    in_progress: 'bg-accent-500 text-white',
    ready: 'bg-gold-500 text-white',
    delivered: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
  };

  return (
    <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
      <div className="p-5 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="font-display font-bold text-sand-900 text-sm">آخر الطلبات</h3>
        <div className="flex gap-1 flex-wrap">
          {statusFilterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`text-[10px] px-2.5 py-1 rounded-full transition-all whitespace-nowrap
                ${filter === opt.value
                  ? 'bg-primary-500 text-white font-semibold'
                  : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
                }
              `}
            >
              {opt.label} ({opt.count})
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sand-200">
              <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">رقم الطلب</th>
              <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">العميل</th>
              <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase hidden sm:table-cell">الطراز</th>
              <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">الحالة</th>
              <th className="text-right px-4 py-3 text-[10px] text-sand-500 font-medium uppercase">المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const styleInfo = styles.find(s => s.id === order.styleId);
              return (
                <tr key={order.id} className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-sand-800 font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-sand-700">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700">
                        {order.customerName.charAt(0)}
                      </div>
                      <span>{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-sand-600 hidden sm:table-cell">
                    {styleInfo ? styleInfo.name : order.styleId}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-medium ${statusColors[order.statusCode] || 'bg-sand-200 text-sand-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-sand-800 font-semibold">{order.totalPrice} ر.س</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  return (
    <AdminLayout title="لوحة المعلومات" subtitle="نظرة عامة على أداء المحل اليومي">
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon="ri-shopping-bag-3-line"
            label="طلبات جديدة"
            value={String(adminStats.todayNewOrders)}
            subtext={`إجمالي هذا الشهر: ${recentOrders.length}`}
            color="primary"
          />
          <StatCard
            icon="ri-scissors-line"
            label="تحت التفصيل"
            value={String(adminStats.currentInProgress)}
            subtext="ثوب قيد التنفيذ الآن"
            color="accent"
          />
          <StatCard
            icon="ri-archive-line"
            label="جاهز للتسليم"
            value={String(adminStats.readyForDelivery)}
            subtext="بانتظار استلام العملاء"
            color="gold"
          />
          <StatCard
            icon="ri-money-cny-circle-line"
            label="الإيرادات اليومية"
            value={`${adminStats.dailyRevenue.toLocaleString()} ر.س`}
            subtext={`الأسبوع: ${adminStats.weeklyRevenue.toLocaleString()} ر.س`}
            color="primary"
          />
        </div>

        {/* Revenue chart + Style distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MiniBarChart />
          </div>
          <div>
            <StyleDistributionChart />
          </div>
        </div>

        {/* Top fabrics + Recent orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <TopFabricsTable />
          </div>
          <div className="lg:col-span-2">
            <RecentOrdersTable />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}