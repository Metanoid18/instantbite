import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/layout/Navbar';
import AccessPortal from './components/layout/AccessPortal';
import CartDrawer from './components/cart/CartDrawer';
import Preloader from './components/ui/Preloader';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservePage from './pages/ReservePage';
import DnaPage from './pages/DnaPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import CheckoutPage from './pages/CheckoutPage';
import LegalPage from './pages/LegalPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dna" element={<DnaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <SettingsProvider>
              <CartProvider>
                <SmoothScroll>
                  <main className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-accent selection:text-white flex flex-col">
                    <Preloader />
                    <AccessPortal />
                    <CartDrawer />
                    <Navbar />
                    <AnimatedRoutes />
                    <Footer />
                  </main>
                </SmoothScroll>
              </CartProvider>
            </SettingsProvider>
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}
