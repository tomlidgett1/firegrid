import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import ProductShowcase from '@/components/landing/ProductShowcase'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] scroll-smooth">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <CTASection />
      <Footer />
    </div>
  )
}
