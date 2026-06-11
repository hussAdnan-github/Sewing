import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'الرئيسية', icon: 'ri-home-5-line', activeIcon: 'ri-home-5-fill' },
  { path: '/fabrics', label: 'الأقمشة', icon: 'ri-t-shirt-line', activeIcon: 'ri-t-shirt-fill' },
  { path: '/tailoring', label: 'تفصيل', icon: 'ri-scissors-line', activeIcon: 'ri-scissors-fill' },
  { path: '/cart', label: 'السلة', icon: 'ri-shopping-basket-2-line', activeIcon: 'ri-shopping-basket-2-fill', badge: 3 },
  { path: '/orders', label: 'طلباتي', icon: 'ri-shopping-bag-3-line', activeIcon: 'ri-shopping-bag-3-fill' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-200 pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-4 min-w-[72px] transition-colors ${
                isActive ? 'text-gold-600' : 'text-sand-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <i className={`${isActive ? item.activeIcon : item.icon} text-xl`}></i>
                {'badge' in item && item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -left-1 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}