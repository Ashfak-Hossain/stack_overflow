import React from 'react';

import LeftSideBar from '@/components/shared/LeftSideBar';
import Navbar from '@/components/shared/navbar/Navbar';
import RightSideBar from '@/components/shared/RightSideBar';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      {/* Navbar */}
      <Navbar />
      <div className="flex">
        {/* Left side bar */}
        <LeftSideBar />

        {/* Main content */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        {/* Right side bar */}
        <RightSideBar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
