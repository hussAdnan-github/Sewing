import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="hidden md:block bg-sand-100 border-t border-sand-200">
      <div className="w-full px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://public.readdy.ai/ai/img_res/bb76c319-54a9-435b-b75f-4ba9a84b143c.png"
                alt="شعار محل الخياطة الذكي"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-bold text-sand-900">الخياطة الذكي</span>
            </div>
            <p className="text-sm text-sand-600 leading-relaxed">
              فن التفصيل بلمسة ذكية. نقدم لك تجربة فريدة في تصميم وتفصيل الثياب الخليجية بأعلى جودة وأدق المقاسات.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sand-900 mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-sand-600 hover:text-gold-600 transition-colors">الصفحة الرئيسية</Link>
              <Link to="/fabrics" className="block text-sm text-sand-600 hover:text-gold-600 transition-colors">معرض الأقمشة</Link>
              <Link to="/tailoring" className="block text-sm text-sand-600 hover:text-gold-600 transition-colors">تفصيل الثوب</Link>
              <Link to="/about" className="block text-sm text-sand-600 hover:text-gold-600 transition-colors">من نحن</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sand-900 mb-4">خدماتنا</h4>
            <div className="space-y-2">
              <span className="block text-sm text-sand-600">تفصيل ثياب خليجية</span>
              <span className="block text-sm text-sand-600">بيع الأقمشة الفاخرة</span>
              <span className="block text-sm text-sand-600">التطريز المخصص</span>
              <span className="block text-sm text-sand-600">تعديل وإصلاح</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sand-900 mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-sand-600">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-phone-line text-gold-600"></i></div>
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sand-600">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-mail-line text-gold-600"></i></div>
                <span>info@smarttailor.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sand-600">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-map-pin-line text-gold-600"></i></div>
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sand-500">© 2026 محل الخياطة الذكي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-sand-600 hover:text-gold-600 hover:bg-gold-50 transition-all" rel="nofollow">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-sand-600 hover:text-gold-600 hover:bg-gold-50 transition-all" rel="nofollow">
              <i className="ri-twitter-x-line"></i>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-sand-600 hover:text-gold-600 hover:bg-gold-50 transition-all" rel="nofollow">
              <i className="ri-whatsapp-line"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}