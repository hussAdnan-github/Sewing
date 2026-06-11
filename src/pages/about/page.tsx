import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleSections((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (index: number) => visibleSections.has(index);

  const values = [
    {
      icon: 'ri-heart-3-line',
      title: 'الإتقان',
      desc: 'كل ثوب يمر بأيدي خياطين محترفين يحرصون على أدق التفاصيل، لأن الثوب ليس مجرد قطعة قماش بل هو هوية تُلبس',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'الثقة',
      desc: 'نضمن لك مقاساً مثالياً من المرة الأولى بفضل نظام القياس الذكي وخبرة سنوات في التفصيل',
    },
    {
      icon: 'ri-flashlight-line',
      title: 'السرعة',
      desc: 'نوعدك بالتسليم في الوقت المحدد مع إمكانية تتبع مراحل إنجاز طلبك لحظة بلحظة',
    },
    {
      icon: 'ri-leaf-line',
      title: 'الاستدامة',
      desc: 'نختار الأقمشة بعناية من مصادر موثوقة، ونحرص على تقليل الهدر لنحافظ على البيئة',
    },
  ];

  const milestones = [
    { year: '2018', title: 'البداية', desc: 'افتتحنا محلنا الأول في حي النسيم بالرياض بفريق مكون من 3 خياطين' },
    { year: '2020', title: 'التوسع', desc: 'انضمام 5 خياطين جدد وافتتاح قسم التطريز المخصص لخدمة الزبائن المميزة' },
    { year: '2022', title: 'التجربة الرقمية', desc: 'إطلاق منصة الخياطة الذكي لتمكين العملاء من تفصيل ثيابهم من منازلهم' },
    { year: '2025', title: 'التميز', desc: 'حصلنا على جائزة أفضل تجربة رقمية في قطاع الأزياء الخليجية' },
  ];

  const team = [
    {
      name: 'عبدالله المالكي',
      role: 'المؤسس والمدير العام',
      img: 'https://readdy.ai/api/search-image?query=Middle%20eastern%20man%20in%20his%2040s%20wearing%20elegant%20dark%20navy%20suit%20confident%20smile%20professional%20headshot%20portrait%20neutral%20studio%20background%20warm%20lighting&width=400&height=400&seq=200&orientation=squarish',
    },
    {
      name: 'خالد السالم',
      role: 'مدير جودة الأقمشة',
      img: 'https://readdy.ai/api/search-image?query=Middle%20eastern%20man%20in%20his%2050s%20wearing%20white%20traditional%20thobe%20dignified%20expression%20professional%20headshot%20portrait%20neutral%20studio%20background%20soft%20lighting&width=400&height=400&seq=201&orientation=squarish',
    },
    {
      name: 'محمد الفهد',
      role: 'رئيس قسم الخياطة',
      img: 'https://readdy.ai/api/search-image?query=Middle%20eastern%20man%20in%20his%2030s%20wearing%20casual%20smart%20blazer%20friendly%20smile%20professional%20headshot%20portrait%20neutral%20studio%20background%20warm%20lighting&width=400&height=400&seq=202&orientation=squarish',
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <section className="relative w-full h-[420px] md:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20tailoring%20workshop%20interior%20with%20mannequins%20and%20luxury%20fabrics%20rolls%20on%20wooden%20shelves%20warm%20golden%20ambient%20lighting%20elegant%20arabic%20style%20interior%20photography%20rich%20textures%20and%20details&width=1400&height=700&seq=180&orientation=landscape')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="animate-slide-up">
            <p className="text-gold-300 text-sm font-medium tracking-wide mb-3">منذ 2018</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              الخياطة الذكي
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-lg mx-auto leading-relaxed">
              حيث تلتقي الحرفية التقليدية مع التقنية الحديثة لمنحك تجربة تفصيل فريدة من نوعها
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        data-index={0}
        className="w-full px-4 md:px-8 py-14 md:py-20"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center transition-all duration-700 ${
              isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="order-2 md:order-1">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 mb-4">
                قصة بدأت بحب الأناقة
              </h2>
              <div className="space-y-4 text-sm md:text-base text-sand-700 leading-relaxed">
                <p>
                  منذ افتتاحنا في عام 2018، ونحن نؤمن بأن الثوب الخليجي ليس مجرد لباس، بل هو هوية وتراث يستحق الاحترام والإتقان. بدأنا كمحل صغير في حي النسيم بالرياض، يضم فريقاً من ثلاثة خياطين متحمسين.
                </p>
                <p>
                  مع مرور الوقت، توسعنا لنصبح وجهة موثوقة لكل من يبحث عن الجودة والدقة. وها نحن اليوم نقدم لكم تجربة رقمية متكاملة تجمع بين حرفية الأجداد وسرعة العصر.
                </p>
                <p>
                  نستخدم أحدث التقنيات لضبط المقاسات، وأفضل الأقمشة من الأسواق العالمية، وأيدي خبيرة في التفصيل لنقدم لك ثوباً يليق بك.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://readdy.ai/api/search-image?query=Close%20up%20hands%20of%20skilled%20tailor%20measuring%20fabric%20with%20tape%20measure%20on%20wooden%20table%20warm%20natural%20lighting%20rich%20brown%20tones%20professional%20photography%20detailed%20textures&width=600&height=750&seq=181&orientation=portrait"
                  alt="خياط يعمل على قياس القماش"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-display font-semibold text-sm">أكثر من 50,000 ثوب فُصّل بإتقان</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
        data-index={1}
        className="w-full px-4 md:px-8 py-14 md:py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-gold-600 text-sm font-medium mb-2">قيمنا</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 mb-3">
              ما الذي يميزنا
            </h2>
            <p className="text-sm text-sand-600 max-w-md mx-auto">
              نبني علاقتنا مع عملائنا على أسس راسخة من الجودة والاحترام
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`bg-sand-50 rounded-2xl p-6 border border-sand-200 transition-all duration-500 hover:border-gold-300 hover:shadow-sm ${
                  isVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold-100 rounded-xl mb-4">
                  <i className={`${v.icon} text-2xl text-gold-600`}></i>
                </div>
                <h3 className="font-display font-bold text-sand-900 text-base mb-2">{v.title}</h3>
                <p className="text-xs text-sand-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section
        ref={(el) => { sectionRefs.current[2] = el; }}
        data-index={2}
        className="w-full px-4 md:px-8 py-14 md:py-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-gold-600 text-sm font-medium mb-2">مسيرتنا</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900">
              مراحل تطورنا
            </h2>
          </div>
          <div className="relative">
            <div className="absolute right-6 md:right-1/2 top-0 bottom-0 w-px bg-sand-200 md:translate-x-px" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start md:items-center gap-6 md:gap-0 transition-all duration-700 ${
                    isVisible(2) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="hidden md:flex flex-1 flex-col items-end pr-8 text-right">
                    {i % 2 === 0 && (
                      <>
                        <span className="font-display font-bold text-gold-500 text-3xl mb-1">{m.year}</span>
                        <h4 className="font-display font-bold text-sand-900 text-base mb-1">{m.title}</h4>
                        <p className="text-sm text-sand-600 leading-relaxed">{m.desc}</p>
                      </>
                    )}
                  </div>
                  <div className="relative z-10 w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white border-2 border-gold-400 rounded-full md:mx-auto">
                    <span className="font-display font-bold text-gold-600 text-sm">{m.year.slice(-2)}</span>
                  </div>
                  <div className="hidden md:flex flex-1 pl-8 text-right">
                    {i % 2 === 1 && (
                      <>
                        <span className="font-display font-bold text-gold-500 text-3xl mb-1">{m.year}</span>
                        <h4 className="font-display font-bold text-sand-900 text-base mb-1">{m.title}</h4>
                        <p className="text-sm text-sand-600 leading-relaxed">{m.desc}</p>
                      </>
                    )}
                  </div>
                  <div className="md:hidden flex-1">
                    <span className="font-display font-bold text-gold-500 text-xl">{m.year}</span>
                    <h4 className="font-display font-bold text-sand-900 text-sm mt-1">{m.title}</h4>
                    <p className="text-xs text-sand-600 leading-relaxed mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        ref={(el) => { sectionRefs.current[3] = el; }}
        data-index={3}
        className="w-full px-4 md:px-8 py-14 md:py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-gold-600 text-sm font-medium mb-2">خدماتنا</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 mb-3">
              ما الذي نقدمه لك
            </h2>
            <p className="text-sm text-sand-600 max-w-md mx-auto">
              مجموعة متكاملة من الخدمات لضمان أناقتك في كل مناسبة
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: 'ri-scissors-cut-line',
                title: 'تفصيل الثياب الخليجية',
                desc: 'سعودي، قطري، عماني، كويتي — بجميع الطرازات التقليدية والحديثة',
              },
              {
                icon: 'ri-t-shirt-line',
                title: 'بيع الأقمشة الفاخرة',
                desc: 'تشكيلة واسعة من أجود الأقمشة: حرير، جورجيت، كتان، قطن، وصوف',
              },
              {
                icon: 'ri-pencil-ruler-line',
                title: 'التطريز المخصص',
                desc: 'أضف لمسة شخصية لثوبك بتطريز الأسماء أو الزخارف حسب الطلب',
              },
              {
                icon: 'ri-ruler-line',
                title: 'نظام القياس الذكي',
                desc: 'احفظ مقاساتك واستخدمها في كل طلب لضمان الدقة دائماً',
              },
              {
                icon: 'ri-time-line',
                title: 'تسليم سريع',
                desc: 'تسليم في الوقت المحدد مع إمكانية تتبع مراحل الإنجاز لحظة بلحظة',
              },
              {
                icon: 'ri-tools-line',
                title: 'تعديل وإصلاح',
                desc: 'خدمة تعديل المقاسات وإصلاح أي عيوب بضمان رضاك التام',
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className={`group bg-sand-50 rounded-2xl p-5 md:p-6 border border-sand-200 transition-all duration-500 hover:border-gold-300 hover:bg-white ${
                  isVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-11 h-11 flex items-center justify-center bg-gold-100 rounded-xl mb-4 group-hover:bg-gold-200 transition-colors">
                  <i className={`${s.icon} text-xl text-gold-600`}></i>
                </div>
                <h3 className="font-display font-bold text-sand-900 text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-sand-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        ref={(el) => { sectionRefs.current[4] = el; }}
        data-index={4}
        className="w-full px-4 md:px-8 py-14 md:py-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-gold-600 text-sm font-medium mb-2">فريقنا</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 mb-3">
              من يقف خلف الكواليس
            </h2>
            <p className="text-sm text-sand-600 max-w-md mx-auto">
              فريق متخصص يجمع بين الخبرة والشغف لإخراج أجمل النتائج
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
            {team.map((t, i) => (
              <div
                key={t.name}
                className={`text-center transition-all duration-700 ${
                  isVisible(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-gold-100">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-display font-bold text-sand-900 text-base">{t.name}</h3>
                <p className="text-xs text-gold-600 mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={(el) => { sectionRefs.current[5] = el; }}
        data-index={5}
        className="w-full px-4 md:px-8 py-14 md:py-20 bg-primary-800"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
            {[
              { number: '50K+', label: 'ثوب فُصّل' },
              { number: '12K+', label: 'عميل سعيد' },
              { number: '25+', label: 'خياط محترف' },
              { number: '8', label: 'سنوات خبرة' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-all duration-700 ${
                  isVisible(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gold-400 mb-2">{stat.number}</div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 md:px-8 py-14 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 mb-4">
            جاهز لتجربة التفصيل الذكي؟
          </h2>
          <p className="text-sm text-sand-600 mb-8 max-w-md mx-auto leading-relaxed">
            ابدأ الآن بتصميم ثوبك الخاص. اختر القماش، حدد المقاسات، واستلم ثوبك المثالي على بابك
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/tailoring"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-gold-400 to-gold-600 text-white font-semibold text-sm rounded-xl px-8 py-3.5 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            >
              <i className="ri-scissors-line"></i>
              ابدأ التفصيل
            </Link>
            <Link
              to="/fabrics"
              className="inline-flex items-center justify-center gap-2 bg-sand-100 text-sand-700 font-semibold text-sm rounded-xl px-8 py-3.5 hover:bg-sand-200 transition-all whitespace-nowrap"
            >
              <i className="ri-t-shirt-line"></i>
              تصفح الأقمشة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}