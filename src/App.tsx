import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LeadModal } from './components/common/LeadModal';
import { AIConsultantWidget } from './components/ai/AIConsultantWidget';
import { SchemaOrg } from './components/common/SchemaOrg';

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
    // If it's a known landing section, scroll to it
    const landingSections = ['home', 'services', 'prices', 'cases'];
    
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
    <main className="min-h-screen pt-16 md:pt-20">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Pain vs Solutions */}
      <PainSolutionSection />

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
      <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-green-500 selection:text-slate-950 antialiased">
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
