import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Fleet from "./pages/Fleet";
import Explore from "./pages/Explore";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TravelGuide from "./pages/TravelGuide";
import ScrollToTop from "./components/ScrollToTop";
import LoginModal from "./components/ui/LoginModal";
import MyBookings from "./pages/MyBookings";
import BookingCalendarEntryPage from "./pages/booking/bookingCreationCalendarV2";
import BookingLayout from "./pages/booking/availabilityFlow/BookingLayout";
import BookingAppShell from "./pages/booking/BookingAppShell";
import Admissions from "./pages/Schedule";
import NeevPage from "./pages/NeevPage";
import ResultsPage from "./pages/ResultsPage";
import FacultyPage from "./pages/FacultyPage";
import KaratePage from "./pages/KaratePage"; 
import GalleryPage from "./pages/GalleryPage";
function AppContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <ScrollToTop />

      <div className="flex min-h-screen w-full flex-col overflow-x-hidden md:block md:w-auto">
        <Navbar onSignupClick={() => setIsLoginOpen(true)} />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/travel-guide" element={<TravelGuide />} />
            <Route path="/schedule" element={<Navigate to="/booking/add" replace />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route element={<BookingAppShell />}>
              <Route path="/booking/add" element={<BookingCalendarEntryPage />} />
              <Route path="/booking/availability" element={<BookingLayout />} />
            </Route>
            <Route path="/neev" element={<NeevPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/karate" element={<KaratePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter
      basename="/"
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
