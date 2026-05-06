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
// キャストは build 時に型チェックが走るこの 1 箇所のみに集約する。
// より厳密にするなら zod で parse するとよい: z.object({...}).parse(rawContent)
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const siteContent: SiteContent = require("../content.json");
