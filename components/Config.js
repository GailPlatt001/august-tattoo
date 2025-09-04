// Central config for links, watermark, etc.
const CONFIG = {
  IG_HANDLE: "august_tattooer",
  BRAND_WATERMARK: "AugustTattoo",
  // Add your number later in Vercel as NEXT_PUBLIC_WHATSAPP (digits only, no +)
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP || "",
  // Appended to external links for attribution
  DEFAULT_UTM: "?utm_source=site&utm_medium=cta&utm_campaign=portfolio",
};
export default CONFIG;

