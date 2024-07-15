import { redirect } from 'next/navigation';

import { getUserById } from '@/actions/user.action';
import Question from '@/components/forms/Question';
// import { auth } from '@clerk/nextjs/server';

export default async function Page() {
  // const { userId } = auth();

  const userId = 'clerk12345';

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question type="create" mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
}
