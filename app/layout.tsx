import Providers from "@/app/providers";
import { Footer } from "@/components/footer";
import HeaderComponent from "@/components/header";
import { LoadingScreen } from "@/components/loadingscreen";
import { Maintenance, MaintenanceType } from "@/components/pages/maintenance";
import { ToasterWrapper } from "@/components/toaster-wrapper";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

const authors: Author[] = [
  {
    name: "Noah Streller",
    url: "https://github.com/noahstreller",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://grades.nstr.dev"),
  applicationName: "Grades",
  title: {
    default: "Grade Calculator - nstr.dev",
    template: "%s - Grades",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grade Calculator",
  },
  formatDetection: {
    telephone: false,
  },
  description:
    "This grade calculator/dashboard features different tools to get an overview of your grades and calculate your average grades for your subjects. It supports any numeric grading system and can calculate weighted averages. It also features a dark mode and is fully responsive. Everything is synced with your favorite service. There is also a legacy version, which saves data exclusively in your browser and does not require an account.",
  keywords: [
    "grade",
    "calculator",
    "dashboard",
    "required grades",
    "dash",
    "app",
    "web app",
    "website",
    "tool",
    "average",
    "weighted",
    "subject",
    "grades",
    "school",
    "student",
    "university",
    "weight",
    "college",
    "high school",
    "passing",
    "failing",
    "required",
    "grades",
    "weighted",
    "overview",
    "average grade",
    "grade average",
    "average calculator",
    "weighted average",
    "weighted grade average",
    "weighted average calculator",
    "weighted grade average calculator",
    "grade overview",
    "grade calculator",
    "grade average calculator",
  ],
  authors,
  publisher: "Noah Streller",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grade Calculator",
      },
    ],
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#030712",
};

const maintenance: MaintenanceType = {
  maintenance: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "production" &&
        process.env.UMAMI_SCRIPT_URL &&
        process.env.UMAMI_DATA_WEBSITE_ID && (
          <Script
            defer
            src={process.env.UMAMI_SCRIPT_URL}
            data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
          />
        )}
      <body className={cn(inter.className)}>
        {maintenance.maintenance || process.env.MAINTENANCE ? (
          <Maintenance maintenance={maintenance} />
        ) : (
          <Providers>
            <HeaderComponent />
            <div className="mt-[5rem] bg-background text-foreground flex flex-col items-center ">
              <main className="min-h-screen w-full flex flex-col items-center">
                {children}
              </main>
              <Footer />
            </div>
            <LoadingScreen />
            <ToasterWrapper />
          </Providers>
        )}
      </body>
    </html>
  );
}
