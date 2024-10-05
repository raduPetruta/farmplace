import "~/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Topbar from "./_components/topbar";
import Footer from "./_components/footer";
 

export const metadata: Metadata = {
  title: "Farmplace",
  description: "Farmplace",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClerkProvider>
          <Topbar />
            {children}
           <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
