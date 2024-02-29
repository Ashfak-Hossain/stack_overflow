import { SearchParamsProps } from '@/types';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default function AnswerTab({ searchParams, userId, clerkId }: Props) {
  return <div>AnswerTab</div>;
}
