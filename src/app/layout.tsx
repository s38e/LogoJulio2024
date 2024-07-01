import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://logojulio.vercel.app/"),
  title: "LogoJulio - Logos competition",
  description: "Dev with LogoJulio by Saeed Khaled",
  openGraph: {
    title: "LogoJulio - Logos competition",
    description: "Dev with LogoJulio by Saeed Khaled",
    images: {
      url: "/assets/Opengraph-Image.jpg",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoJulio - Logos competition",
    description: "Dev with LogoJulio by Saeed Khaled",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
