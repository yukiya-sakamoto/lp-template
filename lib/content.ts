export interface SiteContent {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
  };
  clinic: {
    name: string;
    nameEn: string;
    branch: string;
    address: string;
    tel: string;
    telFormatted: string;
    hours: { label: string; time: string }[];
    access: string[];
    parking: string;
    insurance: string;
    mapUrl: string;
  };
  hero: {
    catchcopy: string;
    subcopy: string;
    lead: string;
    image: string;
  };
  features: {
    num: string;
    title: string;
    desc: string;
  }[];
  about: {
    heading: string;
    body: string[];
    director: {
      name: string;
      role: string;
      qualifications: string[];
      hobbies: string[];
      image: string;
    };
    infoCards: { title: string; desc: string }[];
  };
  symptoms: {
    slug: string;
    name: string;
    nameEn: string;
    desc: string;
    lead: string;
    treatment: string;
    image: string;
    videos?: string[];
    cases: { who: string; text: string }[];
  }[];
  flow: {
    n: string;
    title: string;
    desc: string;
    image: string;
  }[];
  voices: {
    tag: string;
    title: string;
    text: string;
    who: string;
  }[];
  staff: {
    name: string;
    profile: string;
    message: string;
    image: string;
  }[];
  pricing: {
    insurance: { label: string; col1: string; col2: string }[];
    extras: { label: string; price: string }[];
    insuranceTypes: { title: string; desc: string }[];
  };
  images: {
    exterior: string;
    interior: string;
    parking: string;
  };
}

// content.json は .gitignore 対象でクライアントごとに用意する。
// require() は any を返すため TypeScript は構造を検証しない。
// unknown 経由の明示キャストにすることで「意図的な信頼」を一箇所に集約する。
// 厳密な検証が必要な場合は zod を追加: z.object({...}).parse(raw)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const _raw: unknown = require("../content.json");
export const siteContent = _raw as SiteContent;
