import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LeadModal } from './components/common/LeadModal';
import { AIConsultantWidget } from './components/ai/AIConsultantWidget';
import { SchemaOrg } from './components/common/SchemaOrg';
import heroBg from './assets/hero.webp';

// Landing Sections
import { HeroSection } from './components/landing/HeroSection';
import { PainSolutionSection } from './components/landing/PainSolutionSection';
import { ServicesSection } from './components/landing/ServicesSection';
import { AdvantagesSection } from './components/landing/AdvantagesSection';
import { WorkStepsSection } from './components/landing/WorkStepsSection';
import { PricesSection } from './components/landing/PricesSection';
import { CasesSection } from './components/landing/CasesSection';
import { ReviewsSection } from './components/landing/ReviewsSection';
import { GuaranteesSection } from './components/landing/GuaranteesSection';
import { FaqSection } from './components/landing/FaqSection';
import { CalculatorSection } from './components/landing/CalculatorSection';
import { ContactFormSection } from './components/landing/ContactFormSection';
import { SeoTextSection } from './components/landing/SeoTextSection';

// Separate Pages
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { ContactsPage } from './components/pages/ContactsPage';
import { ShopPage } from './components/pages/ShopPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { AdminPage } from './components/pages/AdminPage';

const MainContent: React.FC = () => {
  const { view } = useApp();

  useEffect(() => {
    // 'home' means the very top of the page — show the header's top contact bar
    // and full menu. Scrolling to the #home section instead lands just below the
    // top bar (that bar sits above #home in the flow), so scroll to 0 here.
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Other in-page landing sections scroll to their anchor (they carry
    // scroll-mt-20 so the sticky header doesn't cover them).
    const landingSections = ['services', 'prices', 'cases'];
    if (landingSections.includes(view)) {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Default to top for actual pages (blog, shop, etc)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Full Page Overrides
  if (view === 'admin') return <AdminPage />;
  if (view === 'privacy') return <PrivacyPage />;
  if (view === 'blog') return <BlogPage />;
  if (view === 'blog_detail') return <BlogDetailPage />;
  if (view === 'contacts') return <ContactsPage />;
  if (view === 'shop') return <ShopPage />;

  // Partial View Scroll / Focus Or Full Landing
  return (
    <main className="min-h-screen">
      {/* 1 + 2 share ONE solar-panel backdrop: it flows out of the Hero, through
          Pain, and dissolves into #07140F at the bottom of Pain. The photo is
          MIRROR-tiled (alternating scaleY(-1)) so the panel texture is continuous
          with no visible seam at any tile boundary, at any viewport width. */}
      <div className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 flex flex-col">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-full shrink-0"
                style={{
                  aspectRatio: '3 / 2',
                  backgroundImage: `url(${heroBg})`,
                  backgroundSize: '100% 100%',
                  transform: i % 2 ? 'scaleY(-1)' : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Pain vs Solutions */}
        <PainSolutionSection />
      </div>

      {/* 3. Types / Services */}
      <ServicesSection />

      {/* 4. Advantages */}
      <AdvantagesSection />

      {/* 5. Work Steps Timeline */}
      <WorkStepsSection />

      {/* 6. Turnkey Packages & Credits */}
      <PricesSection />

      {/* 7. Realized Cases */}
      <CasesSection />

      {/* 8. Reviews */}
      <ReviewsSection />

      {/* 9. Guarantees */}
      <GuaranteesSection />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. Online ROI Payback Calculator */}
      <CalculatorSection />

      {/* 12. Contact Form */}
      <ContactFormSection />

      {/* 13. SEO Keywords Article */}
      <SeoTextSection />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="bg-[#F8FAF9] text-[#1A2E23] min-h-screen flex flex-col font-sans selection:bg-green-500 selection:text-white antialiased">
        <SchemaOrg type="organization" />
        {/* Persistent Top Navigation Bar */}
        <Navbar />

        {/* Dynamic View Router */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Persistent Footer */}
        <Footer />

        {/* Action Modal & Gemini Consultant */}
        <LeadModal />
        <AIConsultantWidget />
      </div>
    </AppProvider>
  );
}
