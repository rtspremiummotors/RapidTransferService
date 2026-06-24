import { useState } from "react";
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
import BookTaxi from "./pages/BookTaxi.jsx";
import BookParcel from "./pages/BookParcel.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import DriverSignup from "./pages/DriverSignup.jsx";

// Simple client-side "router" — no library needed.
// page can be: "home" | "book-taxi" | "book-parcel"
export default function App() {
  const [page, setPage] = useState("home");

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "book-taxi") {
    return (
      <>
        <Header onNav={goTo} />
        <BookTaxi onBack={() => goTo("home")} />
        <Footer onNav={goTo} />
      </>
    );
  }

  if (page === "terms") {
    return (
      <>
        <Header onNav={goTo} />
        <Terms onBack={() => goTo("home")} />
        <Footer onNav={goTo} />
      </>
    );
  }

  if (page === "drive-with-us") {
    return (
      <>
        <Header onNav={goTo} />
        <DriverSignup onBack={() => goTo("home")} />
        <Footer onNav={goTo} />
      </>
    );
  }

  if (page === "privacy") {
    return (
      <>
        <Header onNav={goTo} />
        <Privacy onBack={() => goTo("home")} />
        <Footer onNav={goTo} />
      </>
    );
  }

  if (page === "book-parcel") {
    return (
      <>
        <Header onNav={goTo} />
        <BookParcel onBack={() => goTo("home")} />
        <Footer onNav={goTo} />
      </>
    );
  }

  return (
    <>
      <Header onNav={goTo} />
      <main>
        <Hero onBook={goTo} />
        <Services onBook={goTo} />
        <HowItWorks />
        <Fleet onBook={goTo} />
        <WhyChooseUs />
        <Testimonials />
        <PopularRoutes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}