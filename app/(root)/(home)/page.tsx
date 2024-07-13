import React from 'react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      Home
    </div>
  );
};

export default Home;
