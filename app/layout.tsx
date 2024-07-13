import React from 'react';
import type { Metadata } from 'next';

import { inter, spaceGrotesk } from '@/fonts/fonts';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';

export const metadata: Metadata = {
  title: 'Devflow',
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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionLink: 'primary-text-gradient hover:text-primary-500',
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
