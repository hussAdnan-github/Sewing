import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { path: '/admin', label: 'لوحة المعلومات', icon: 'ri-dashboard-line', activeIcon: 'ri-dashboard-fill' },
  { path: '/admin/fabrics', label: 'إدارة الأقمشة', icon: 'ri-t-shirt-line', activeIcon: 'ri-t-shirt-fill' },
  { path: '/admin/tailoring-options', label: 'خيارات التفصيل', icon: 'ri-scissors-line', activeIcon: 'ri-scissors-fill' },
  { path: '/admin/tailors', label: 'الخياطين', icon: 'ri-user-star-line', activeIcon: 'ri-user-star-fill' },
  { path: '/admin/orders', label: 'الطلبات', icon: 'ri-shopping-bag-3-line', activeIcon: 'ri-shopping-bag-3-fill' },
  { path: '/admin/settings', label: 'الإعدادات', icon: 'ri-settings-3-line', activeIcon: 'ri-settings-3-fill' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center lg:hidden"
      >
        <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-lg text-sand-800`}></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen bg-white border-l border-sand-200 z-40 transition-all duration-300 flex flex-col
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-sand-200">
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-3">
              <img
                src="https://public.readdy.ai/ai/img_res/edited_725c185b0294c71ae2b909c4e12519f7_0837ea7f.jpg"
                alt="شعار الخياطة الذكي"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="font-display font-bold text-sm text-sand-900">الخياطة الذكي</h1>
                <p className="text-[10px] text-sand-500">لوحة التحكم</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <img
              src="https://public.readdy.ai/ai/img_res/edited_725c185b0294c71ae2b909c4e12519f7_0837ea7f.jpg"
              alt="شعار"
              className="w-10 h-10 object-contain mx-auto"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-sand-100 transition-colors"
          >
            <i className={collapsed ? "ri-arrow-left-s-fill text-sand-500" : "ri-arrow-right-s-fill text-sand-500"}></i>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                  ${active
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-sand-600 hover:bg-sand-50 hover:text-sand-800'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className={`${active ? item.activeIcon : item.icon} text-lg`}></i>
                </div>
                {!collapsed && (
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                )}
                {active && !collapsed && (
                  <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-sand-200 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sand-600 hover:bg-sand-50 hover:text-sand-800 transition-all
              ${collapsed ? 'justify-center' : ''}
            `}
            title={collapsed ? 'العودة للموقع' : undefined}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-external-link-line text-lg"></i>
            </div>
            {!collapsed && <span className="text-sm">العودة للموقع</span>}
          </Link>
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all
              ${collapsed ? 'justify-center' : ''}
            `}
            title={collapsed ? 'تسجيل الخروج' : undefined}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-logout-box-line text-lg"></i>
            </div>
            {!collapsed && <span className="text-sm">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>
    </>
  );
}