import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Fleet from "./components/Fleet.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Testimonials from "./components/Testimonials.jsx";
import PopularRoutes from "./components/PopularRoutes.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import SeoLinks from "./components/SeoLinks.jsx";
import Seo, { SITE_URL } from "./components/Seo.jsx";

import BookTaxi from "./pages/BookTaxi.jsx";
import BookParcel from "./pages/BookParcel.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import DriverSignup from "./pages/DriverSignup.jsx";
import TaxiBrussels from "./pages/TaxiBrussels.jsx";
import BrusselsAirportTransfer from "./pages/BrusselsAirportTransfer.jsx";
import CharleroiAirportTransfer from "./pages/CharleroiAirportTransfer.jsx";
import AirportTransfers from "./pages/AirportTransfers.jsx";
import InternationalTransfers from "./pages/InternationalTransfers.jsx";
import BusinessTransfers from "./pages/BusinessTransfers.jsx";
import NotFound from "./pages/NotFound.jsx";

// Maps the same "page" keys your components already call (onNav("book-taxi"),
// onBook("book-parcel"), etc.) to real URLs. This is the ONLY thing that
// changed about navigation — every child component's props are unchanged.
const PATHS = {
  home: "/",
  "book-taxi": "/book-taxi",
  "book-parcel": "/book-parcel",
  terms: "/terms",
  privacy: "/privacy",
  "drive-with-us": "/drive-with-us",
  "taxi-brussels": "/taxi-brussels",
  "brussels-airport-transfer": "/brussels-airport-transfer",
  "charleroi-airport-transfer": "/charleroi-airport-transfer",
  "airport-transfers": "/airport-transfers",
  "international-transfers": "/international-transfers",
  "business-transfers": "/business-transfers",
};

function useGoTo() {
  const navigate = useNavigate();
  return (page) => {
    navigate(PATHS[page] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

// Scrolls to top on every route change (browser back/forward, direct links).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function HomePage({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Rapid Transfer Service",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mark.png`,
      areaServed: ["Belgium", "France", "Netherlands", "Luxembourg", "Germany", "Switzerland", "Austria", "United Kingdom"],
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Rapid Transfer Service",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: "Rapid Transfer Service",
      areaServed: [
        { "@type": "Country", name: "Belgium" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "Netherlands" },
        { "@type": "Country", name: "Luxembourg" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "Switzerland" },
        { "@type": "Country", name: "Austria" },
      ],
      availableChannel: {
        "@type": "ServiceChannel",
        servicePhone: "+32465575007",
      },
    },
  ];

  return (
    <>
      <Seo
        title="Rapid Transfer Service | Taxi & Private Transfers Belgium"
        description="Premium taxi and private transfers across Belgium, serving clients nationwide including Brussels, Antwerp and Ghent. Airport transfers, business travel, and international transfers across Western Europe. Book online, 24/7."
        path="/"
        structuredData={structuredData}
      />
      <main>
        <Hero onBook={goTo} />
        <Services onBook={goTo} />
        <HowItWorks />
        <Fleet onBook={goTo} />
        <WhyChooseUs />
        <Testimonials />
        <PopularRoutes />
        <SeoLinks />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  const goTo = useGoTo();

  return (
    <>
      <ScrollToTop />
      <Header onNav={goTo} />

      <Routes>
        <Route path="/" element={<HomePage goTo={goTo} />} />
        <Route path="/book-taxi" element={<BookTaxi onBack={() => goTo("home")} />} />
        <Route path="/book-parcel" element={<BookParcel onBack={() => goTo("home")} />} />
        <Route path="/terms" element={<Terms onBack={() => goTo("home")} />} />
        <Route path="/privacy" element={<Privacy onBack={() => goTo("home")} />} />
        <Route path="/drive-with-us" element={<DriverSignup onBack={() => goTo("home")} />} />
        <Route path="/taxi-brussels" element={<TaxiBrussels goTo={goTo} />} />
        <Route path="/brussels-airport-transfer" element={<BrusselsAirportTransfer goTo={goTo} />} />
        <Route path="/charleroi-airport-transfer" element={<CharleroiAirportTransfer goTo={goTo} />} />
        <Route path="/airport-transfers" element={<AirportTransfers goTo={goTo} />} />
        <Route path="/international-transfers" element={<InternationalTransfers goTo={goTo} />} />
        <Route path="/business-transfers" element={<BusinessTransfers goTo={goTo} />} />
        <Route path="*" element={<NotFound goTo={goTo} />} />
      </Routes>

      <Footer onNav={goTo} />
    </>
  );
}