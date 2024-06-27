import Image from "next/image";
import Landing from "@/app/components/home"
import Hero from "@/app/components/Hero"
import Features from "@/app/components/Features"
import HowItWorks from "@/app/components/HowItworks"
import Testimonials from "@/app/components/testimonials"
import Pricing from "@/app/components/pricing"
import FAQs from "@/app/components/faqs"
import Footer from "@/app/components/footer"


export default function Home() {

  return (
    <>
      <Landing/>
      <Hero  />
      <Features />
      <HowItWorks />
      {/* <Testimonials />
      <Pricing /> */}
      {/* <FAQs /> */}
      {/* <Footer /> */}
      
    </>
  );
}
