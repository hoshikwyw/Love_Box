import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To The Moon And Back 🌙",
  description: "A little universe, made for you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070512",
  // Let the page paint under the notch / home indicator; we pad with safe-area insets.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
