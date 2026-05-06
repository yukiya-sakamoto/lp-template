import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Symptoms from "../components/Symptoms";
import Flow from "../components/Flow";
import Voice from "../components/Voice";
import Staff from "../components/Staff";
import Pricing from "../components/Pricing";
import Access from "../components/Access";
import Footer from "../components/Footer";
import { siteContent as c } from "../lib/content";
import { DEFAULT_NAV } from "../lib/nav";

export default function HomePage() {
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <Hero hero={c.hero} clinic={c.clinic} />
      <Features features={c.features} />
      <About about={c.about} />
      <Symptoms symptoms={c.symptoms} />
      <Flow flow={c.flow} />
      <Voice voices={c.voices} />
      <Staff staff={c.staff} />
      <Pricing pricing={c.pricing} />
      <Access clinic={c.clinic} images={c.images} />
      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
