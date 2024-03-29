import ThemeProvider from '@/context/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { SpeedInsights } from '@vercel/speed-insights/next';
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google';
import React from 'react';
import './globals.css';
import '../styles/prism.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Dev Overflow',
  description:
    'Dev Overflow is a community of developers, for developers, by developers. We are dedicated to providing a safe, welcoming, and inclusive space for all developers.',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
