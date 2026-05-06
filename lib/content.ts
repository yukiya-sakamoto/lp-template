import { z } from "zod";

const HoursSchema = z.object({
  label: z.string(),
  time: z.string(),
});

const ClinicSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
  branch: z.string(),
  address: z.string(),
  tel: z.string(),
  telFormatted: z.string(),
  hours: z.array(HoursSchema),
  access: z.array(z.string()),
  parking: z.string(),
  insurance: z.string(),
  mapUrl: z.string(),
});

const SymptomSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEn: z.string(),
  desc: z.string(),
  lead: z.string(),
  treatment: z.string(),
  image: z.string(),
  videos: z.array(z.string()).optional(),
  cases: z.array(z.object({ who: z.string(), text: z.string() })),
});

const SiteContentSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: z.string(),
  }),
  clinic: ClinicSchema,
  hero: z.object({
    catchcopy: z.string(),
    subcopy: z.string(),
    lead: z.string(),
    image: z.string(),
  }),
  features: z.array(z.object({
    num: z.string(),
    title: z.string(),
    desc: z.string(),
  })),
  about: z.object({
    heading: z.string(),
    body: z.array(z.string()),
    director: z.object({
      name: z.string(),
      role: z.string(),
      qualifications: z.array(z.string()),
      hobbies: z.array(z.string()),
      image: z.string(),
    }),
    infoCards: z.array(z.object({ title: z.string(), desc: z.string() })),
  }),
  symptoms: z.array(SymptomSchema),
  flow: z.array(z.object({
    n: z.string(),
    title: z.string(),
    desc: z.string(),
    image: z.string(),
  })),
  voices: z.array(z.object({
    tag: z.string(),
    title: z.string(),
    text: z.string(),
    who: z.string(),
  })),
  staff: z.array(z.object({
    name: z.string(),
    profile: z.string(),
    message: z.string(),
    image: z.string(),
  })),
  pricing: z.object({
    insurance: z.array(z.object({ label: z.string(), col1: z.string(), col2: z.string() })),
    extras: z.array(z.object({ label: z.string(), price: z.string() })),
    insuranceTypes: z.array(z.object({ title: z.string(), desc: z.string() })),
  }),
  images: z.object({
    exterior: z.string(),
    interior: z.string(),
    parking: z.string(),
  }),
});

// SiteContent 型は Zod スキーマから自動導出 — インターフェース定義との二重管理なし
export type SiteContent = z.infer<typeof SiteContentSchema>;

// content.json は .gitignore 対象でクライアントごとに用意する。
// parse() が失敗した場合は build 時に Zod のエラーメッセージで原因を特定できる。
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const siteContent: SiteContent = SiteContentSchema.parse(require("../content.json"));
