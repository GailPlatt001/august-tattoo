export const metadata = {
  title: "August Tattoo — Neo‑Traditional Portfolio",
  description: "Minimal, fashion‑forward tattoo portfolio for AugustTattoo. Book via WhatsApp or Instagram.",
};

export default function RootLayout({ children }) {
  const GA = process.env.NEXT_PUBLIC_GA || "G-KDJ6TFL60S"; // fallback to provided ID
  return (
    <html lang="en">
      <head>
        {GA && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${GA}');`,
              }}
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
