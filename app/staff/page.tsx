import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { siteContent as c } from "../../lib/content";
import { DEFAULT_NAV } from "../../lib/nav";

export const metadata = { title: `スタッフ紹介 | ${c.meta.title}` };

export default function StaffPage() {
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label="STAFF"
        title="スタッフ紹介"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "スタッフ紹介", href: "/staff/" },
        ]}
      />

      <main style={{ backgroundColor: "var(--color-cream)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="sec-label">STAFF</span>
          <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 40, lineHeight: 1.5 }}>スタッフ一同でお待ちしています</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="grid-3">
            {c.staff.map(s => (
              <div key={s.name} style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden", backgroundColor: "var(--color-warm)" }}>
                  <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                </div>
                <div style={{ padding: "22px 20px" }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-light)", marginBottom: 14, lineHeight: 1.6 }}>{s.profile}</div>
                  <p style={{ fontSize: 14, color: "var(--color-text-body)", lineHeight: 2.0 }}>{s.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
