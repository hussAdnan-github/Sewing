import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Navbar from "./components/feature/Navbar";
import Footer from "./components/feature/Footer";
import BottomNav from "./components/feature/BottomNav";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen bg-sand-50 relative ${isAdmin ? '' : 'max-w-md mx-auto shadow-2xl shadow-black/10'}`}>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'pb-20 md:pb-0'}>
        <AppRoutes />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppContent />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
