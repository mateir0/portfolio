import About from "@/components/About";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import HeaderIndex from "@/components/HeaderIndex";
import Hero from "@/components/Hero";
import Lab from "@/components/Lab";
import Odometer from "@/components/Odometer";
import RecordLog from "@/components/RecordLog";
import Services from "@/components/Services";
import SmoothScroll from "@/components/SmoothScroll";
import Statement from "@/components/Statement";
import WorkIndex from "@/components/WorkIndex";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <GrainOverlay />
      <Cursor />
      <HeaderIndex />
      <main className="relative">
        <Hero />
        <Statement />
        <WorkIndex />
        <Services />
        <Odometer />
        <Lab />
        <RecordLog />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}