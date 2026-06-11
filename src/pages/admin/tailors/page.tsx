import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { tailors } from '@/mocks/admin';

const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

interface TailorItem {
  id: string;
  name: string;
  specialty: string;
  workDays: string[];
  dailyCapacity: number;
  currentLoad: number;
  experience: number;
  phone: string;
}

function TailorModal({
  tailor,
  onClose,
  onSave,
  isNew,
}: {
  tailor: TailorItem | null;
  onClose: () => void;
  onSave: (t: TailorItem) => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<TailorItem>(
    tailor || {
      id: 't' + Date.now(),
      name: '',
      specialty: 'سعودي',
      workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      dailyCapacity: 2,
      currentLoad: 0,
      experience: 1,
      phone: '',
    }
  );

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const specialties = ['سعودي', 'قطري', 'عماني', 'إماراتي', 'كويتي', 'يمني'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-5 border-b border-sand-200 flex items-center justify-between">
          <h2 className="font-display font-bold text-sand-900">{isNew ? 'إضافة خياط جديد' : 'تعديل بيانات الخياط'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100">
            <i className="ri-close-line text-lg text-sand-500"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">الاسم</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">التخصص</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">الخبرة (سنوات)</label>
              <input
                type="number"
                min={0}
                max={50}
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">رقم التواصل</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">طاقة الإنجاز اليومية (ثوب/يوم)</label>
            <input
              type="number"
              required
              min={1}
              max={10}
              value={form.dailyCapacity}
              onChange={(e) => setForm({ ...form, dailyCapacity: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">أيام العمل</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${form.workDays.includes(day) ? 'bg-primary-500 text-white' : 'bg-sand-100 text-sand-500'}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium hover:bg-sand-200"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600"
            >
              {isNew ? 'إضافة' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminTailors() {
  const [tailorList, setTailorList] = useState<TailorItem[]>([...tailors]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TailorItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const totalCapacity = tailorList.reduce((sum, t) => sum + t.dailyCapacity, 0);
  const totalLoad = tailorList.reduce((sum, t) => sum + t.currentLoad, 0);

  const filtered = tailorList.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.specialty.includes(search)
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (t: TailorItem) => {
    setTailorList((prev) => {
      const idx = prev.findIndex((item) => item.id === t.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = t;
        return next;
      }
      return [t, ...prev];
    });
    showToast(editing ? 'تم تحديث بيانات الخياط' : 'تم إضافة الخياط');
    setEditing(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTailorList((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    showToast('تم حذف الخياط');
  };

  const loadColor = (load: number, capacity: number) => {
    const ratio = load / capacity;
    if (ratio >= 1) return 'bg-red-500';
    if (ratio >= 0.75) return 'bg-gold-500';
    return 'bg-accent-400';
  };

  return (
    <AdminLayout title="الخياطين" subtitle="إدارة فريق الخياطين وقدرة الإنتاج">
      <div className="space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-sand-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <i className="ri-team-line text-lg"></i>
              </div>
              <span className="text-sm text-sand-600">عدد الخياطين</span>
            </div>
            <p className="text-2xl font-display font-bold text-sand-900">{tailorList.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-sand-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                <i className="ri-flashlight-line text-lg"></i>
              </div>
              <span className="text-sm text-sand-600">إجمالي الطاقة اليومية</span>
            </div>
            <p className="text-2xl font-display font-bold text-sand-900">{totalCapacity} <span className="text-sm font-normal text-sand-500">ثوب/يوم</span></p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-sand-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-50 text-gold-600">
                <i className="ri-loader-4-line text-lg"></i>
              </div>
              <span className="text-sm text-sand-600">الحمل الحالي</span>
            </div>
            <p className="text-2xl font-display font-bold text-sand-900">{totalLoad} <span className="text-sm font-normal text-sand-500">ثوب قيد التنفيذ</span></p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-sand-400"></i>
            </div>
            <input
              type="text"
              placeholder="ابحث في الخياطين..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
            خياط جديد
          </button>
        </div>

        {/* Tailor cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tailor) => {
            const loadRatio = tailor.currentLoad / tailor.dailyCapacity;
            const isOverloaded = loadRatio >= 1;
            return (
              <div key={tailor.id} className="bg-white rounded-2xl border border-sand-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-lg font-bold text-primary-700">
                      {tailor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sand-900 text-sm">{tailor.name}</h3>
                      <p className="text-xs text-sand-500">تخصص: {tailor.specialty} · {tailor.experience} سنة</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setEditing(tailor); setModalOpen(true); }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 text-sand-400 hover:text-primary-600"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(tailor.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-sand-400 hover:text-red-500"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-sand-600">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-phone-line text-sand-400"></i></div>
                    <span dir="ltr">{tailor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-sand-600">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-calendar-line text-sand-400"></i></div>
                    <span>{tailor.workDays.join('، ')}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-sand-500">الحمل اليومي</span>
                      <span className={isOverloaded ? 'text-red-500 font-medium' : 'text-sand-600'}>
                        {tailor.currentLoad}/{tailor.dailyCapacity} ثوب
                      </span>
                    </div>
                    <div className="w-full h-2 bg-sand-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${loadColor(tailor.currentLoad, tailor.dailyCapacity)}`}
                        style={{ width: `${Math.min(100, loadRatio * 100)}%` }}
                      />
                    </div>
                    {isOverloaded && (
                      <p className="text-[10px] text-red-500 mt-1">وصل لحد طاقته! لا يمكن تعيين طلبات جديدة</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-sand-200">
            <div className="w-16 h-16 flex items-center justify-center bg-sand-100 rounded-full mx-auto mb-3">
              <i className="ri-user-search-line text-2xl text-sand-400"></i>
            </div>
            <p className="text-sm text-sand-600">لا يوجد خياط يطابق البحث</p>
          </div>
        )}
      </div>

      {modalOpen && (
        <TailorModal
          tailor={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={handleSave}
          isNew={!editing}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center shadow-2xl">
            <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-full mx-auto mb-3">
              <i className="ri-alert-line text-2xl text-red-500"></i>
            </div>
            <h3 className="font-display font-bold text-sand-900 mb-1">تأكيد الحذف</h3>
            <p className="text-sm text-sand-600 mb-5">هل أنت متأكد من حذف هذا الخياط؟</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium">إلغاء</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">حذف</button>
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