export const DEFAULT_NAV = [
  { label: "院長ご挨拶", href: "/#about" },
  { label: "症状・施術", href: "/symptoms/" },
  { label: "施術の流れ", href: "/flow/" },
  { label: "患者様の声", href: "/#voice" },
  { label: "スタッフ",   href: "/staff/" },
  { label: "料金",       href: "/pricing/" },
  { label: "アクセス",   href: "/access/" },
] as const;

export type NavItem = { label: string; href: string };
