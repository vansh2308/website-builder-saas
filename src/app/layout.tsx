import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verve",
  description: "All in one agency solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            disableTransitionOnChange
          >
            <ModalProvider>
              {children}
              <Toaster />
            </ModalProvider>
          </ThemeProvider>
        </body>
      </html>

  );
}
