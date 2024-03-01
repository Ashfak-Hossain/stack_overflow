import { getUserAnswer } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from '../cards/AnswerCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default async function AnswerTab({
  // searchParams,
  userId,
  clerkId,
}: Props) {
  const results = await getUserAnswer({ userId, page: 1 });

  return (
    <>
      {results.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
}
