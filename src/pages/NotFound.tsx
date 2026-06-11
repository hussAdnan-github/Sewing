import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-4 pt-20">
      <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-sand-100 rounded-full">
        <i className="ri-error-warning-line text-3xl text-sand-400"></i>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-3">404</h1>
      <p className="text-lg text-sand-600 mb-2">الصفحة غير موجودة</p>
      <p className="text-sm text-sand-500 mb-8">يبدو أن الصفحة التي تبحث عنها غير متوفرة حالياً</p>
      <Link to="/" className="btn-primary">
        <i className="ri-home-line ml-2"></i>
        العودة للرئيسية
      </Link>
    </div>
  );
}
