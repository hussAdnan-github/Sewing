import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { collarTypes, pocketTypes, zipperTypes, buttonTypes, cuffTypes, threadColors, embroideryPatterns } from '@/mocks/tailoring-options';

interface OptionItem {
  id: string;
  name: string;
  image?: string;
  color?: string;
}

type CategoryKey = 'collar' | 'pocket' | 'zipper' | 'button' | 'cuff' | 'thread' | 'embroidery';

const categories: { key: CategoryKey; label: string; icon: string; data: OptionItem[] }[] = [
  { key: 'collar', label: 'أنواع الأطواق', icon: 'ri-shirt-line', data: collarTypes },
  { key: 'pocket', label: 'أنواع الجيوب', icon: 'ri-handbag-line', data: pocketTypes },
  { key: 'zipper', label: 'أنواع السحابات', icon: 'ri-arrow-up-down-line', data: zipperTypes },
  { key: 'button', label: 'أنواع الأزرار', icon: 'ri-checkbox-blank-circle-line', data: buttonTypes },
  { key: 'cuff', label: 'أنواع الأكمام', icon: 'ri-arrow-left-right-line', data: cuffTypes },
  { key: 'thread', label: 'ألوان الخيط', icon: 'ri-palette-line', data: threadColors.map(t => ({ id: t.id, name: t.name, color: t.color })) },
  { key: 'embroidery', label: 'نماذج التطريز', icon: 'ri-star-line', data: embroideryPatterns },
];

function OptionModal({
  item,
  category,
  onClose,
  onSave,
  isNew,
}: {
  item: OptionItem | null;
  category: CategoryKey;
  onClose: () => void;
  onSave: (o: OptionItem) => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<OptionItem>(
    item || { id: category + Date.now(), name: '', image: '', color: '' }
  );

  const isThread = category === 'thread';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-sand-900 text-sm">{isNew ? 'إضافة خيار جديد' : 'تعديل الخيار'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100">
            <i className="ri-close-line text-lg text-sand-500"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {isThread ? (
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">لون الخيط (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.color || '#C9A227'}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-sand-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.color || ''}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-medium text-sand-700 block mb-1">رابط الصورة (اختياري)</label>
              <input
                type="url"
                value={form.image || ''}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-sand-100 text-sand-700 text-sm font-medium">إلغاء</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600">{isNew ? 'إضافة' : 'حفظ'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminTailoringOptions() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('collar');
  const [itemsMap, setItemsMap] = useState<Record<CategoryKey, OptionItem[]>>({
    collar: [...collarTypes],
    pocket: [...pocketTypes],
    zipper: [...zipperTypes],
    button: [...buttonTypes],
    cuff: [...cuffTypes],
    thread: threadColors.map(t => ({ id: t.id, name: t.name, color: t.color })),
    embroidery: [...embroideryPatterns],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OptionItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const currentCategory = categories.find((c) => c.key === activeTab)!;
  const items = itemsMap[activeTab];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = (o: OptionItem) => {
    setItemsMap((prev) => {
      const list = [...prev[activeTab]];
      const idx = list.findIndex((x) => x.id === o.id);
      if (idx >= 0) list[idx] = o;
      else list.push(o);
      return { ...prev, [activeTab]: list };
    });
    showToast(editingItem ? 'تم التعديل' : 'تم الإضافة');
    setEditingItem(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItemsMap((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((x) => x.id !== id),
    }));
    setDeleteConfirm(null);
    showToast('تم الحذف');
  };

  return (
    <AdminLayout title="خيارات التفصيل" subtitle="إدارة كل تفاصيل الثوب المتاحة للعملاء">
      <div className="space-y-4">
        {/* Category tabs */}
        <div className="bg-white rounded-2xl border border-sand-200 p-1.5">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all
                  ${activeTab === cat.key ? 'bg-primary-500 text-white' : 'text-sand-600 hover:bg-sand-50'}
                `}
              >
                <div className="w-4 h-4 flex items-center justify-center"><i className={cat.icon}></i></div>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sand-900 text-sm">{currentCategory.label}</h3>
            <p className="text-xs text-sand-500">{items.length} خيار متاح</p>
          </div>
          <button
            onClick={() => { setEditingItem(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-colors"
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center"><i className="ri-add-line"></i></div>
            إضافة
          </button>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-sand-200 overflow-hidden group relative">
              {activeTab === 'thread' && item.color ? (
                <div className="h-24" style={{ backgroundColor: item.color }} />
              ) : item.image ? (
                <div className="h-24 bg-sand-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
              ) : (
                <div className="h-24 bg-sand-50 flex items-center justify-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-sand-200 rounded-full">
                    <i className={`${currentCategory.icon} text-lg text-sand-400`}></i>
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-xs font-medium text-sand-800 text-center truncate">{item.name}</p>
              </div>
              {/* Actions overlay */}
              <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setEditingItem(item); setModalOpen(true); }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/90 text-sand-600 hover:text-primary-600 shadow-sm"
                >
                  <i className="ri-edit-line text-xs"></i>
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/90 text-sand-600 hover:text-red-500 shadow-sm"
                >
                  <i className="ri-delete-bin-line text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <OptionModal
          item={editingItem}
          category={activeTab}
          onClose={() => { setModalOpen(false); setEditingItem(null); }}
          onSave={handleSave}
          isNew={!editingItem}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center shadow-2xl">
            <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-full mx-auto mb-3">
              <i className="ri-alert-line text-xl text-red-500"></i>
            </div>
            <h3 className="font-display font-bold text-sand-900 text-sm mb-1">تأكيد الحذف</h3>
            <p className="text-xs text-sand-600 mb-4">هل تريد حذف هذا الخيار؟</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 rounded-xl bg-sand-100 text-sand-700 text-xs font-medium">إلغاء</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-xl bg-red-500 text-white text-xs font-semibold hover:bg-red-600">حذف</button>
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