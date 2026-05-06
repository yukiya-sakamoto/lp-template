import { z } from "zod";

const SlugSchema = z.string().regex(/^[a-z0-9-]+$/, "slug は小文字英数字とハイフンのみ");
const UrlSchema = z.string().url("有効な URL を指定してください");
const ImagePathSchema = z.string().min(1, "image は必須です");

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
  mapUrl: UrlSchema,
});

const SymptomSchema = z.object({
  slug: SlugSchema,
  name: z.string(),
  nameEn: z.string(),
  desc: z.string(),
  lead: z.string(),
  treatment: z.string(),
  image: ImagePathSchema,
  videos: z.array(z.string().min(1)).optional(),
  cases: z.array(z.object({ who: z.string(), text: z.string() })),
});

const SiteContentSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: UrlSchema,
  }),
  clinic: ClinicSchema,
  hero: z.object({
    catchcopy: z.string(),
    subcopy: z.string(),
    lead: z.string(),
    image: ImagePathSchema,
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
      image: ImagePathSchema,
    }),
    infoCards: z.array(z.object({ title: z.string(), desc: z.string() })),
  }),
  symptoms: z.array(SymptomSchema).refine(
    symptoms => new Set(symptoms.map(s => s.slug)).size === symptoms.length,
    "symptoms の slug が重複しています"
  ),
  flow: z.array(z.object({
    n: z.string(),
    title: z.string(),
    desc: z.string(),
    image: ImagePathSchema,
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
    image: ImagePathSchema,
  })),
  pricing: z.object({
    insurance: z.array(z.object({ label: z.string(), col1: z.string(), col2: z.string() })),
    extras: z.array(z.object({ label: z.string(), price: z.string() })),
    insuranceTypes: z.array(z.object({ title: z.string(), desc: z.string() })),
  }),
  images: z.object({
    exterior: ImagePathSchema,
    interior: ImagePathSchema,
    parking: ImagePathSchema,
  }),
});

// SiteContent 型は Zod スキーマから自動導出 — インターフェース定義との二重管理なし
export type SiteContent = z.infer<typeof SiteContentSchema>;

// content.json は .gitignore 対象でクライアントごとに用意する。
// parse() が失敗した場合は build 時に Zod のエラーメッセージで原因を特定できる。
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const siteContent: SiteContent = SiteContentSchema.parse(require("../content.json"));
