import type { Metadata } from 'next';
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import './globals.css';
import type React from 'react'; // Import React

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CourseHub',
  description: 'Discover and inquire about our courses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
