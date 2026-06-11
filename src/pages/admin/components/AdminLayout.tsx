import AdminSidebar from './AdminSidebar';

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen bg-sand-50 lg:flex lg:flex-row-reverse">
      <AdminSidebar />
      <main className="flex-1 min-h-screen">
        {/* Page header */}
        <div className="px-6 pt-16 lg:pt-6 pb-4">
          {title && (
            <div>
              <h1 className="font-display text-xl font-bold text-sand-900">{title}</h1>
              {subtitle && <p className="text-sm text-sand-500 mt-1">{subtitle}</p>}
            </div>
          )}
        </div>
        {/* Content */}
        <div className="px-6 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}