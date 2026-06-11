import { useState } from 'react';
import { fabrics } from '@/mocks/fabrics';
import { styles } from '@/mocks/styles';
import {
  collarTypes,
  pocketTypes,
  zipperTypes,
  buttonTypes,
  cuffTypes,
  threadColors,
  embroideryPatterns,
} from '@/mocks/tailoring-options';

const steps = [
  'اختيار القماش',
  'نوع التفصيل',
  'تفاصيل الثوب',
  'المقاسات',
  'المراجعة',
];

interface Measurements {
  totalLength: number;
  shoulderWidth: number;
  sleeveLength: number;
  wristWidth: number;
  neckCircumference: number;
  chestWidth: number;
  bottomOpening: number;
}

const defaultMeasurements: Measurements = {
  totalLength: 145,
  shoulderWidth: 48,
  sleeveLength: 60,
  wristWidth: 18,
  neckCircumference: 42,
  chestWidth: 56,
  bottomOpening: 70,
};

export default function Tailoring() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [ownFabric, setOwnFabric] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [collar, setCollar] = useState<string | null>(null);
  const [pocket, setPocket] = useState<string | null>(null);
  const [zipper, setZipper] = useState<string | null>(null);
  const [button, setButton] = useState<string | null>(null);
  const [cuff, setCuff] = useState<string | null>(null);
  const [threadColor, setThreadColor] = useState<string | null>(null);
  const [embroidery, setEmbroidery] = useState(false);
  const [embroideryPosition, setEmbroideryPosition] = useState<string[]>([]);
  const [embroideryPattern, setEmbroideryPattern] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Measurements>({ ...defaultMeasurements });
  const [openAccordion, setOpenAccordion] = useState<string>('collar');

  const fabric = fabrics.find((f) => f.id === selectedFabric);
  const style = styles.find((s) => s.id === selectedStyle);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return ownFabric || selectedFabric !== null;
      case 1: return selectedStyle !== null;
      case 2: return collar !== null && pocket !== null && zipper !== null && button !== null && cuff !== null && threadColor !== null;
      case 3: return true;
      default: return true;
    }
  };

  const tailoringPrice = style ? style.price_adjustment : 0;
  const fabricPrice = fabric && !ownFabric ? fabric.price_per_meter * 3.5 : 0;
  const embroideryPrice = embroidery ? 80 : 0;
  const totalPrice = tailoringPrice + fabricPrice + embroideryPrice;

  // Mobile stepper with text labels
  const Stepper = () => (
    <div className="bg-white border-b border-sand-200 px-4 py-3 sticky top-[52px] z-40">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  i < currentStep
                    ? 'bg-accent-500 text-white'
                    : i === currentStep
                    ? 'bg-gold-500 text-white ring-2 ring-gold-100'
                    : 'bg-sand-100 text-sand-400'
                }`}
              >
                {i < currentStep ? <i className="ri-check-line text-xs"></i> : i + 1}
              </div>
              <span className={`text-[9px] font-medium whitespace-nowrap ${
                i === currentStep ? 'text-gold-600' : i < currentStep ? 'text-accent-600' : 'text-sand-400'
              }`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-3 h-0.5 mx-0.5 ${i < currentStep ? 'bg-accent-500' : 'bg-sand-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-gold-50 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-gold-100 rounded-xl">
          <i className="ri-information-line text-gold-600"></i>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-sand-900">هل لديك قماش خاص؟</p>
          <p className="text-xs text-sand-600">يمكنك إحضار قماشك الخاص</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={ownFabric}
            onChange={(e) => {
              setOwnFabric(e.target.checked);
              if (e.target.checked) setSelectedFabric(null);
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-sand-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
        </label>
      </div>

      {!ownFabric && (
        <>
          <h3 className="font-display font-semibold text-sand-900 text-sm">اختر قماشك المفضل</h3>
          <div className="grid grid-cols-2 gap-3">
            {fabrics.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFabric(f.id === selectedFabric ? null : f.id)}
                className={`text-right rounded-2xl border-2 overflow-hidden active:scale-[0.98] transition-transform ${
                  selectedFabric === f.id
                    ? 'border-gold-500 shadow-md'
                    : 'border-sand-200'
                }`}
              >
                <div className="aspect-[3/4] relative">
                  <img src={f.images[0]} alt={f.name} className="w-full h-full object-cover object-top" />
                  {selectedFabric === f.id && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white">
                      <i className="ri-check-line text-xs"></i>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="font-display font-semibold text-white text-xs">{f.name}</p>
                    <p className="text-white/80 text-[10px]">{f.price_per_meter} ريال/متر</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {ownFabric && (
        <div className="bg-white rounded-2xl border border-sand-200 p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-accent-50 rounded-full">
            <i className="ri-t-shirt-line text-2xl text-accent-500"></i>
          </div>
          <p className="text-sm text-sand-700">سيتم إعلام صاحب المحل بأن لديك قماش خاص</p>
        </div>
      )}
    </div>
  );

  const Step2 = () => (
    <div className="space-y-5 animate-fade-in">
      <h3 className="font-display font-semibold text-sand-900 text-sm">اختر طراز الثوب</h3>
      <div className="grid grid-cols-2 gap-3">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStyle(s.id === selectedStyle ? null : s.id)}
            className={`relative rounded-2xl overflow-hidden border-2 active:scale-[0.98] transition-transform ${
              selectedStyle === s.id ? 'border-gold-500 shadow-md' : 'border-sand-200'
            }`}
          >
            <div className="aspect-[4/5] relative">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {selectedStyle === s.id && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white z-10">
                  <i className="ri-check-line text-xs"></i>
                </div>
              )}
              <div className="absolute bottom-0 right-0 left-0 p-3">
                <h4 className="font-display font-bold text-white text-sm">{s.name}</h4>
                <p className="text-white/80 text-[10px] mt-0.5">{s.country}</p>
                {selectedStyle === s.id && (
                  <p className="text-gold-300 text-[10px] mt-1.5 leading-relaxed">{s.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const Step3 = () => {
    const AccordionItem = ({ id, title, icon, children }: { id: string; title: string; icon: string; children: React.ReactNode }) => (
      <div className="border border-sand-200 rounded-2xl overflow-hidden mb-3">
        <button
          onClick={() => setOpenAccordion(openAccordion === id ? '' : id)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-sand-50 active:bg-sand-100 transition-colors"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl">
            <i className={`${icon} text-gold-600`}></i>
          </div>
          <span className="font-display font-medium text-sand-900 flex-1 text-right text-sm">{title}</span>
          <i className={`ri-arrow-down-s-line text-sand-400 transition-transform ${openAccordion === id ? 'rotate-180' : ''}`}></i>
        </button>
        {openAccordion === id && (
          <div className="p-3 bg-white animate-fade-in">{children}</div>
        )}
      </div>
    );

    return (
      <div className="space-y-4 animate-fade-in">
        <h3 className="font-display font-semibold text-sand-900 text-sm">تفاصيل الثوب</h3>

        <AccordionItem id="collar" title="نوع الرقبة" icon="ri-shirt-line">
          <div className="grid grid-cols-2 gap-2">
            {collarTypes.map((c) => (
              <button
                key={c.id}
                onClick={() => setCollar(c.id)}
                className={`p-2.5 rounded-xl border-2 text-center active:scale-[0.98] transition-transform ${
                  collar === c.id ? 'border-gold-500 bg-gold-50' : 'border-sand-200'
                }`}
              >
                <img src={c.image} alt={c.name} className="w-14 h-14 mx-auto mb-1 object-contain" />
                <p className="text-[11px] font-medium text-sand-900">{c.name}</p>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="pocket" title="الجيب" icon="ri-handbag-line">
          <div className="grid grid-cols-2 gap-2">
            {pocketTypes.map((p) => (
              <button
                key={p.id}
                onClick={() => setPocket(p.id)}
                className={`p-2.5 rounded-xl border-2 text-center active:scale-[0.98] transition-transform ${
                  pocket === p.id ? 'border-gold-500 bg-gold-50' : 'border-sand-200'
                }`}
              >
                {p.image && <img src={p.image} alt={p.name} className="w-14 h-14 mx-auto mb-1 object-contain" />}
                <p className="text-[11px] font-medium text-sand-900">{p.name}</p>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="zipper" title="السحاب" icon="ri-toggle-line">
          <div className="grid grid-cols-2 gap-2">
            {zipperTypes.map((z) => (
              <button
                key={z.id}
                onClick={() => setZipper(z.id)}
                className={`p-2.5 rounded-xl border-2 text-center active:scale-[0.98] transition-transform ${
                  zipper === z.id ? 'border-gold-500 bg-gold-50' : 'border-sand-200'
                }`}
              >
                {z.image && <img src={z.image} alt={z.name} className="w-14 h-14 mx-auto mb-1 object-contain" />}
                <p className="text-[11px] font-medium text-sand-900">{z.name}</p>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="button" title="الأزرار" icon="ri-checkbox-blank-circle-line">
          <div className="grid grid-cols-2 gap-2">
            {buttonTypes.map((b) => (
              <button
                key={b.id}
                onClick={() => setButton(b.id)}
                className={`p-2.5 rounded-xl border-2 text-center active:scale-[0.98] transition-transform ${
                  button === b.id ? 'border-gold-500 bg-gold-50' : 'border-sand-200'
                }`}
              >
                <img src={b.image} alt={b.name} className="w-14 h-14 mx-auto mb-1 object-contain rounded-lg" />
                <p className="text-[11px] font-medium text-sand-900">{b.name}</p>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="cuff" title="الكم (المعصم)" icon="ri-braces-line">
          <div className="grid grid-cols-2 gap-2">
            {cuffTypes.map((cf) => (
              <button
                key={cf.id}
                onClick={() => setCuff(cf.id)}
                className={`p-2.5 rounded-xl border-2 text-center active:scale-[0.98] transition-transform ${
                  cuff === cf.id ? 'border-gold-500 bg-gold-50' : 'border-sand-200'
                }`}
              >
                <img src={cf.image} alt={cf.name} className="w-14 h-14 mx-auto mb-1 object-contain" />
                <p className="text-[11px] font-medium text-sand-900">{cf.name}</p>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="thread" title="لون خيط التفصيل" icon="ri-palette-line">
          <div className="flex flex-wrap gap-2">
            {threadColors.map((tc) => (
              <button
                key={tc.id}
                onClick={() => setThreadColor(tc.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                  threadColor === tc.id ? 'ring-2 ring-gold-500 bg-gold-50' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-full border-2 border-sand-200" style={{ backgroundColor: tc.color }} />
                <span className="text-[10px] text-sand-700">{tc.name}</span>
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem id="embroidery" title="التطريز" icon="ri-sparkling-line">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sand-900">هل تريد إضافة تطريز؟</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={embroidery}
                  onChange={(e) => {
                    setEmbroidery(e.target.checked);
                    if (!e.target.checked) {
                      setEmbroideryPosition([]);
                      setEmbroideryPattern(null);
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-sand-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
              </label>
            </div>

            {embroidery && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <p className="text-xs text-sand-600 mb-2">اختر موضع التطريز:</p>
                  <div className="flex flex-wrap gap-2">
                    {['صدر', 'كم', 'رقبة'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => {
                          setEmbroideryPosition((prev) =>
                            prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          embroideryPosition.includes(pos)
                            ? 'bg-gold-500 text-white'
                            : 'bg-sand-100 text-sand-600'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-sand-600 mb-2">اختر نموذج التطريز:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {embroideryPatterns.map((ep) => (
                      <button
                        key={ep.id}
                        onClick={() => setEmbroideryPattern(ep.id)}
                        className={`rounded-xl border-2 overflow-hidden active:scale-[0.98] transition-transform ${
                          embroideryPattern === ep.id ? 'border-gold-500 shadow-sm' : 'border-sand-200'
                        }`}
                      >
                        <img src={ep.image} alt={ep.name} className="w-full h-20 object-cover object-top" />
                        <p className="text-[11px] font-medium text-sand-900 p-2 text-center">{ep.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </AccordionItem>
      </div>
    );
  };

  const Step4 = () => {
    const measurementFields: { key: keyof Measurements; label: string; unit: string }[] = [
      { key: 'totalLength', label: 'الطول الكلي', unit: 'سم' },
      { key: 'shoulderWidth', label: 'عرض الكتف', unit: 'سم' },
      { key: 'sleeveLength', label: 'طول اليد', unit: 'سم' },
      { key: 'wristWidth', label: 'عرض اليد (المعصم)', unit: 'سم' },
      { key: 'neckCircumference', label: 'دائرة الرقبة', unit: 'سم' },
      { key: 'chestWidth', label: 'عرض الصدر', unit: 'سم' },
      { key: 'bottomOpening', label: 'الخطوة (الفتحة السفلية)', unit: 'سم' },
    ];

    return (
      <div className="space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-sand-900 text-sm">المقاسات</h3>
          <button
            onClick={() => setMeasurements({ ...defaultMeasurements })}
            className="text-xs text-gold-600 font-medium"
          >
            <i className="ri-refresh-line ml-1"></i>
            مقاساتي المحفوظة
          </button>
        </div>

        <div className="space-y-3">
          {measurementFields.map((field) => (
            <div key={field.key} className="bg-white rounded-2xl border border-sand-200 p-4">
              <label className="text-xs font-medium text-sand-900 mb-2 block">{field.label}</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMeasurements((prev) => ({ ...prev, [field.key]: Math.max(1, prev[field.key] - 1) }))}
                  className="w-10 h-10 flex items-center justify-center bg-sand-100 rounded-xl text-sand-700 active:bg-sand-200 transition-colors"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <input
                  type="number"
                  value={measurements[field.key]}
                  onChange={(e) => setMeasurements((prev) => ({ ...prev, [field.key]: Math.max(1, parseFloat(e.target.value) || 0) }))}
                  className="flex-1 text-center bg-sand-50 rounded-xl py-2.5 text-lg font-bold text-sand-900 border border-sand-200 focus:outline-none focus:border-gold-400"
                />
                <button
                  onClick={() => setMeasurements((prev) => ({ ...prev, [field.key]: prev[field.key] + 1 }))}
                  className="w-10 h-10 flex items-center justify-center bg-sand-100 rounded-xl text-sand-700 active:bg-sand-200 transition-colors"
                >
                  <i className="ri-add-line"></i>
                </button>
                <span className="text-xs text-sand-500 w-6">{field.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-accent-50 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-accent-100 rounded-lg flex-shrink-0 mt-0.5">
            <i className="ri-lightbulb-line text-accent-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-sand-900">نصيحة القياس</p>
            <p className="text-xs text-sand-600 mt-1 leading-relaxed">
              قم بقياس ثوبك المفضل على مسطح مستوٍ، واستخدم شريط قياس ناعم.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Step5 = () => (
    <div className="space-y-5 animate-fade-in">
      <h3 className="font-display font-semibold text-sand-900 text-sm">مراجعة الطلب</h3>

      <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
        {fabric && !ownFabric && (
          <div className="flex items-center gap-3 p-4 border-b border-sand-100">
            <img src={fabric.images[0]} alt={fabric.name} className="w-14 h-14 object-cover object-top rounded-xl" />
            <div>
              <p className="font-medium text-sand-900 text-sm">{fabric.name}</p>
              <p className="text-xs text-sand-500">{fabric.type} · 3.5 متر</p>
            </div>
            <p className="mr-auto font-bold text-gold-600 text-sm">{fabricPrice.toFixed(0)} ريال</p>
          </div>
        )}

        {ownFabric && (
          <div className="p-4 border-b border-sand-100">
            <p className="text-sm font-medium text-sand-900">قماش خاص</p>
            <p className="text-xs text-sand-500">سأحضر قماشي الخاص</p>
          </div>
        )}

        {style && (
          <div className="p-4 border-b border-sand-100">
            <p className="text-sm font-medium text-sand-900">{style.name}</p>
            <p className="text-xs text-sand-500">{style.description}</p>
          </div>
        )}

        <div className="p-4 border-b border-sand-100">
          <p className="text-xs font-medium text-sand-500 mb-2">تفاصيل التفصيل</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="flex justify-between"><span className="text-sand-600">الرقبة:</span> <span className="text-sand-900">{collarTypes.find(c => c.id === collar)?.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-sand-600">الجيب:</span> <span className="text-sand-900">{pocketTypes.find(p => p.id === pocket)?.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-sand-600">السحاب:</span> <span className="text-sand-900">{zipperTypes.find(z => z.id === zipper)?.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-sand-600">الأزرار:</span> <span className="text-sand-900">{buttonTypes.find(b => b.id === button)?.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-sand-600">الكم:</span> <span className="text-sand-900">{cuffTypes.find(cf => cf.id === cuff)?.name || '-'}</span></div>
            <div className="flex justify-between"><span className="text-sand-600">لون الخيط:</span> <span className="text-sand-900">{threadColors.find(tc => tc.id === threadColor)?.name || '-'}</span></div>
          </div>
          {embroidery && (
            <div className="mt-2 pt-2 border-t border-sand-100">
              <p className="text-xs text-sand-500">تطريز: {embroideryPosition.join('، ')} · {embroideryPatterns.find(ep => ep.id === embroideryPattern)?.name || ''}</p>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium text-sand-500 mb-2">المقاسات</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <span className="text-sand-600">الطول: {measurements.totalLength}سم</span>
            <span className="text-sand-600">الكتف: {measurements.shoulderWidth}سم</span>
            <span className="text-sand-600">اليد: {measurements.sleeveLength}سم</span>
            <span className="text-sand-600">المعصم: {measurements.wristWidth}سم</span>
            <span className="text-sand-600">الرقبة: {measurements.neckCircumference}سم</span>
            <span className="text-sand-600">الصدر: {measurements.chestWidth}سم</span>
          </div>
        </div>
      </div>

      <div className="bg-gold-50 rounded-2xl p-5 border border-gold-200 space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-sand-600">تكلفة التفصيل:</span> <span className="text-sand-900">{tailoringPrice} ريال</span></div>
          {fabricPrice > 0 && <div className="flex justify-between"><span className="text-sand-600">القماش:</span> <span className="text-sand-900">{fabricPrice.toFixed(0)} ريال</span></div>}
          {embroideryPrice > 0 && <div className="flex justify-between"><span className="text-sand-600">التطريز:</span> <span className="text-sand-900">{embroideryPrice} ريال</span></div>}
          <div className="border-t border-gold-200 pt-2 flex justify-between">
            <span className="font-semibold text-sand-900">الإجمالي:</span>
            <span className="font-display font-bold text-gold-700 text-lg">{totalPrice.toFixed(0)} ريال</span>
          </div>
        </div>
        <button className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base">
          <i className="ri-secure-payment-line"></i>
          تأكيد وإتمام الطلب
        </button>
      </div>
    </div>
  );

  const stepComponents = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-sand-50">
      <Stepper />

      <div className="w-full px-4 py-5 pb-32">
        <div className="max-w-3xl mx-auto">
          <CurrentStepComponent />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-sand-200 px-4 py-3 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              currentStep === 0
                ? 'bg-sand-100 text-sand-400 cursor-not-allowed'
                : 'bg-sand-100 text-sand-700 active:bg-sand-200'
            }`}
          >
            السابق
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                canProceed()
                  ? 'bg-accent-500 text-white active:bg-accent-600 shadow-sm'
                  : 'bg-sand-200 text-sand-400 cursor-not-allowed'
              }`}
            >
              التالي
              <i className="ri-arrow-left-line"></i>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}