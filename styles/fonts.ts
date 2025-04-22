import {
  Geist
  // Geist_Mono,
  // Inter,
  // Manrope,
  // Roboto,
} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });
// const roboto = Roboto({
//   weight: ["100", "300", "400", "500", "700", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
// });
// const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export {
  geistSans
  // geistMono, inter, roboto, manrope
};
