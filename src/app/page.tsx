import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ShaderBackground } from "@/components/scene/ShaderBackground";
import { About } from "@/components/sections/About";
import { CareerTabs } from "@/components/sections/CareerTabs";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pb-12">
          <Hero />
          <CareerTabs />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
