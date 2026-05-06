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
import content from "../content.json";
import type { SiteContent } from "../lib/content";

const c = content as SiteContent;

export default function HomePage() {
  return (
    <>
      <Header clinic={c.clinic} nav={defaultNav} />
      <Hero hero={c.hero} clinic={c.clinic} />
      <Features features={c.features} />
      <About about={c.about} />
      <Symptoms symptoms={c.symptoms} />
      <Flow flow={c.flow} />
      <Voice voices={c.voices} />
      <Staff staff={c.staff} />
      <Pricing pricing={c.pricing} />
      <Access clinic={c.clinic} images={c.images} />
      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={defaultNav} />
    </>
  );
}

const defaultNav = [
  { label: "院長ご挨拶", href: "/#about" },
  { label: "症状・施術", href: "/symptoms/" },
  { label: "施術の流れ", href: "/flow/" },
  { label: "患者様の声", href: "/#voice" },
  { label: "スタッフ",   href: "/staff/" },
  { label: "料金",       href: "/pricing/" },
  { label: "アクセス",   href: "/access/" },
];
