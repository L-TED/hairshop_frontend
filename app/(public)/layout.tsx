import Header from "@/components/layout/Header";
import "../../styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
  variable: "--font-inter", // Assign a CSS variable name
});

export const metadata = {
  title: "Salon Project",
  description: "Hair salon reservation service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.variable}>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
