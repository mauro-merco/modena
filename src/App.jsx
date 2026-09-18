// Tipografía técnica (families usadas por los tokens).
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'

import Header from './components/Header'
import Hero from './components/Hero'
import MediaStrip from './components/MediaStrip'
import CoursesSection from './components/CoursesSection'
import Modalidad from './components/Modalidad'
import Experiencia from './components/Experiencia'
import Sedes from './components/Sedes'
import CertificacionSection from './components/CertificacionSection'
import FAQSection from './components/FAQSection'
import InscripcionSection from './components/InscripcionSection'
import MobileStickyCta from './components/MobileStickyCta'
import Footer from './components/Footer'
import Seo from './components/Seo'
import { SITE } from './data/site'
import { initGTM } from './lib/analytics'
import { captureUtms } from './lib/analytics'

// Solo se inyecta GTM cuando el cliente define un ID real (no se publican IDs inventados).
if (SITE.analytics.gtmId) initGTM(SITE.analytics.gtmId)
captureUtms()

export default function App() {
  return (
    <>
      <Seo />
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <MediaStrip />
        <CoursesSection />
        <Modalidad />
        <Experiencia />
        <Sedes />
        <CertificacionSection />
        <FAQSection />
        <InscripcionSection />
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  )
}