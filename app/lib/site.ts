export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smart-tools-calc.com"
).replace(/\/+$/, "");

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-8352654211889930";
