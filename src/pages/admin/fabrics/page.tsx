import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fabrics, fabricTypes, fabricColors } from '@/mocks/fabrics';
import { adminSettings } from '@/mocks/admin';

interface FabricItem {
  id: string;
  name: string;
  description: string;
  price_per_meter: number;
  images: string[];
  type: string;
  color: string;
  availability: string;
  quantity: number;
  composition: string;
  texture: string;
  suitable_for: string;
}

function FabricModal({
  fabric,
  onClose,
  onSave,
  isNew,
}: {
  fabric: FabricItem | null;
  onClose: () => void;
  onSave: (f: FabricItem) => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<FabricItem>(
    fabric || {
      id: 'f' + Date.now(),
      name: '',
      description: '',
      price_per_meter: 0,
      images: [''],
      type: fabricTypes[1],
      color: fabricColors[1],
      availability: 'متوفر',
      quantity: 0,
      composition: '',
      texture: '',
      suitable_for: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-5 border-b border-sand-200 flex items-center justify-between">
          <h2 className="font-display font-bold text-sand-900">{isNew ? 'إضافة قماش جديد' : 'تعديل القماش'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100">
            <i className="ri-close-line text-lg text-sand-500"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">اسم القماش</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">الوصف</label>
            <textarea
              rows={3}
              maxLength={500}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">السعر/متر</label>
              <input
                type="number"
                required
                min={0}
                value={form.price_per_meter}
                onChange={(e) => setForm({ ...form, price_per_meter: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">الكمية</label>
              <input
                type="number"
                required
                min={0}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">النوع</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
              >
                {fabricTypes.filter(t => t !== 'الكل').map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">اللون</label>
              <select
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
              >
                {fabricColors.filter(c => c !== 'الكل').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">التوفر</label>
            <div className="flex gap-2">
              {['متوفر', 'محدود'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm({ ...form, availability: opt })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${form.availability === opt ? 'bg-primary-500 text-white' : 'bg-sand-100 text-sand-600'}
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">التركيبة</label>
              <input
                type="text"
                value={form.composition}
                onChange={(e) => setForm({ ...form, composition: e.target.value })}
                placeholder="100% قطن"
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">الملمس</label>
              <input
                type="text"
                value={form.texture}
                onChange={(e) => setForm({ ...form, texture: e.target.value })}
                placeholder="ناعم وخفيف"
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1">مناسب لـ</label>
            <input
              type="text"
              value={form.suitable_for}
              onChange={(e) => setForm({ ...form, suitable_for: e.target.value })}
              placeholder="المناسبات والأعراس"
              className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium hover:bg-sand-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              {isNew ? 'إضافة' : 'حفظ التعديلات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminFabrics() {
  const [fabricList, setFabricList] = useState<FabricItem[]>([...fabrics]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('الكل');
  const [availFilter, setAvailFilter] = useState('الكل');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFabric, setEditingFabric] = useState<FabricItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const lowStockThreshold = adminSettings.lowStockThreshold;

  const filtered = fabricList.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'الكل' || f.type === typeFilter;
    const matchesAvail = availFilter === 'الكل' || (availFilter === 'متوفر' ? f.availability === 'متوفر' : f.availability === 'محدود');
    return matchesSearch && matchesType && matchesAvail;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (f: FabricItem) => {
    setFabricList((prev) => {
      const idx = prev.findIndex((item) => item.id === f.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = f;
        return next;
      }
      return [f, ...prev];
    });
    showToast(editingFabric ? 'تم تعديل القماش بنجاح' : 'تم إضافة القماش بنجاح');
    setEditingFabric(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setFabricList((prev) => prev.filter((f) => f.id !== id));
    setDeleteConfirm(null);
    showToast('تم حذف القماش');
  };

  const isLowStock = (qty: number) => qty <= lowStockThreshold;

  return (
    <AdminLayout title="إدارة الأقمشة" subtitle="عرض وتعديل وإضافة الأقمشة في المعرض">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            <div className="relative flex-1">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-sand-400"></i>
              </div>
              <input
                type="text"
                placeholder="ابحث في الأقمشة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
            >
              <option value="الكل">كل الأنواع</option>
              {fabricTypes.filter(t => t !== 'الكل').map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={availFilter}
              onChange={(e) => setAvailFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none bg-white"
            >
              <option value="الكل">التوفر</option>
              <option value="متوفر">متوفر</option>
              <option value="محدود">محدود</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingFabric(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
            قماش جديد
          </button>
        </div>

        {/* Fabric cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((fabric) => (
            <div key={fabric.id} className="bg-white rounded-2xl border border-sand-200 overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={fabric.images[0]}
                  alt={fabric.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-1">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${fabric.availability === 'متوفر' ? 'bg-green-500 text-white' : 'bg-gold-500 text-white'}`}>
                    {fabric.availability}
                  </span>
                  {isLowStock(fabric.quantity) && (
                    <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-red-500 text-white animate-pulse">
                      مخزون منخفض
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    {fabric.price_per_meter} ر.س/متر
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-sand-900 text-sm">{fabric.name}</h3>
                    <p className="text-xs text-sand-500 mt-0.5">{fabric.type} · {fabric.color}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingFabric(fabric);
                        setModalOpen(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 text-sand-400 hover:text-primary-600 transition-colors"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(fabric.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-sand-400 hover:text-red-500 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-sand-500 mt-2 line-clamp-2">{fabric.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] text-sand-400 mb-1">
                      <span>المخزون</span>
                      <span className={isLowStock(fabric.quantity) ? 'text-red-500 font-medium' : ''}>{fabric.quantity} متر</span>
                    </div>
                    <div className="w-full h-1.5 bg-sand-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isLowStock(fabric.quantity) ? 'bg-red-400' : 'bg-accent-400'}`}
                        style={{ width: `${Math.min(100, (fabric.quantity / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-sand-200">
            <div className="w-16 h-16 flex items-center justify-center bg-sand-100 rounded-full mx-auto mb-3">
              <i className="ri-t-shirt-line text-2xl text-sand-400"></i>
            </div>
            <p className="text-sm text-sand-600">لا توجد أقمشة تطابق البحث</p>
            <button
              onClick={() => { setSearch(''); setTypeFilter('الكل'); setAvailFilter('الكل'); }}
              className="text-xs text-primary-600 mt-2 hover:underline"
            >
              مسح الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <FabricModal
          fabric={editingFabric}
          onClose={() => { setModalOpen(false); setEditingFabric(null); }}
          onSave={handleSave}
          isNew={!editingFabric}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center shadow-2xl">
            <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-full mx-auto mb-3">
              <i className="ri-alert-line text-2xl text-red-500"></i>
            </div>
            <h3 className="font-display font-bold text-sand-900 mb-1">تأكيد الحذف</h3>
            <p className="text-sm text-sand-600 mb-5">هل أنت متأكد من حذف هذا القماش؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sand-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-slide-up">
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}