import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { EmulatorProvider } from './context/EmulatorContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { AudienceTabs } from './components/sections/AudienceTabs';
import { InteractivePhoneEmulator } from './components/emulator/InteractivePhoneEmulator';
import { PachoStories } from './components/sections/PachoStories';
import { TechPortal } from './components/sections/TechPortal';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <EmulatorProvider>
          <div className="min-h-screen flex flex-col bg-[#080b0a] dark:bg-[#080b0a] light:bg-[#f8faf9] text-[#f3f6f4] dark:text-[#f3f6f4] light:text-[#0d1210] transition-colors duration-300">
            <Header />
            <main className="flex-1">
              <Hero />
              <AudienceTabs />
              <InteractivePhoneEmulator />
              <PachoStories />
              <TechPortal />
            </main>
            <Footer />
          </div>
        </EmulatorProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
