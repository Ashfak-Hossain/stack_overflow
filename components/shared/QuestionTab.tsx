import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import QuestionCard from '../cards/QuestionCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default async function QuestionTab({
  // searchParams,
  userId,
  clerkId,
}: Props) {
  const results = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {results.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          views={question.views}
          upvotes={question.upvotes}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
}
