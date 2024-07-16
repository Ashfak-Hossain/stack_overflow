import { revalidatePath } from 'next/cache';

import { CreateAnswerParams } from '@/actions/shared.types';
import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.model';
import Question from '@/database/question.model';
import User from '@/database/user.model';
import { connectToDatabase } from '@/lib/mongoose';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
      path,
    });

    // add the answer to the question's answers array
    const questionObj = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // create an interaction record for the user's create_answer action
    await Interaction.create({
      user: author,
      action: 'answer',
      question,
      answer: newAnswer._id,
      tags: questionObj.tag,
    });

    // increment author's reputation by +S for creating a answer
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
