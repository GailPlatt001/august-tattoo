const CONFIG = {
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "https://august-tattoo.com",
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA || "G-KDJ6TFL60S",
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP || "", // e.g., 821012345678
  IG_HANDLE: process.env.NEXT_PUBLIC_IG_HANDLE || "august_tattooer",
  BRAND_WATERMARK: process.env.NEXT_PUBLIC_BRAND_WATERMARK || "AugustTattoo",
  DEFAULT_UTM: process.env.NEXT_PUBLIC_DEFAULT_UTM || "?utm_source=qr_card&utm_medium=print&utm_campaign=launch",
};

export default CONFIG;
