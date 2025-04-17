import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
// import "./globals.css";
import "../style/sass/style.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "../style/icomoon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const noto = Noto_Serif({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${noto.styleName} antialised`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
