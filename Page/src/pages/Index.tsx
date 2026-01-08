import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Pricing from "@/components/LandingPage/Pricing";
import Testimonials from "@/components/LandingPage/Testimonials";
import ContactForm from "@/components/LandingPage/ContactForm";
import Footer from "@/components/LandingPage/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
