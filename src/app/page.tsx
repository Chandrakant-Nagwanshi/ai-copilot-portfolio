import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import PersonalWork from "@/components/sections/PersonalWork";
import Playground from "@/components/sections/Playground";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <PersonalWork />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
