import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";
import Header from "@/components/layouts/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = generateSEO({
  path: '/',
});
// export const metadata = {
//   metadataBase: new URL('https://webspires.com.pk'),

//   title: {
//     default: 'Web Development & Digital Marketing Agency in Pakistan',
//     template: '%s | Webspires',
//   },

//   description:
//     'Grow your business with a trusted digital marketing agency in Pakistan. We build high-performance websites, SEO strategies, and ROI-driven solutions.',

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },

//   alternates: {
//     canonical: '/',
//   },

//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     url: 'https://webspires.com.pk/',
//     siteName: 'Webspires | Web Development Agency',
//     title: 'Web Development & Digital Marketing Agency in Pakistan',
//     description:
//       'Grow your business with a trusted digital marketing agency in Pakistan. We build high-performance websites, SEO strategies, and ROI-driven solutions.',
//     images: [
//       {
//         url: '/images/webspires-logo-icon.png',
//         width: 512,
//         height: 512,
//         alt: 'Webspires',
//       },
//     ],
//   },

//   twitter: {
//     card: 'summary_large_image',
//     title: 'Web Development & Digital Marketing Agency in Pakistan',
//     description:
//       'Grow your business with a trusted digital marketing agency in Pakistan. We build high-performance websites, SEO strategies, and ROI-driven solutions.',
//     images: ['/images/webspires-logo-icon.png'],
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        cz-shortcut-listen="true"
        className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
