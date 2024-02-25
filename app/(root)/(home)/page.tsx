import Filter from '@/components/shared/Filter';
import HomeFilters from '@/components/shared/Home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';

const questions = [
  {
    _id: 1,
    title: 'Cascading deletes a SQLAlchemy?',
    tags: [
      { _id: 1, name: 'Python' },
      { _id: 2, name: 'SQL' },
    ],
    author: 'Ashfak Hossain',
    upvotes: 10,
    views: 180,
    answers: 2,
    createdAt: '2021-09-01T00:00:00.000Z',
  },
  {
    _id: 2,
    title: 'How to integrate a Java script with SQL?',
    tags: [
      { _id: 1, name: 'Java' },
      { _id: 2, name: 'SQL' },
    ],
    author: 'Mugdha',
    upvotes: 10,
    views: 180,
    answers: 2,
    createdAt: '2021-09-01T00:00:00.000Z',
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgsrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => 'QuestionCard.tsx')
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! Ask a question and kickstart the discussion. Out query could be the next big thing others learn from. Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
