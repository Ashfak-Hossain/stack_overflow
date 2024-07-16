import React from 'react';
import { Metadata } from 'next';

import { getAllUsers } from '@/actions/user.action';
import UserCard from '@/components/Cards/UserCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { UserFilters } from '@/constants/filters';

export const metadata: Metadata = {
  title: 'Community — Stack Overflow',
  description:
    'Join the community of amazing minds. Get involved, ask questions, and help others.',
};

const CommunityPage = async () => {
  const results = await getAllUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgsrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <NoResult
            title="No Users Found"
            description="Be the first to break the silence! 🚀 Signup to be the first and kickstart the community. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign Up"
          />
        )}
      </section>
    </>
  );
};

export default CommunityPage;
