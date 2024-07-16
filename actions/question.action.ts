'use server';

import { revalidatePath } from 'next/cache';

import {
  CreateQuestionParams,
  EditQuestionParams,
  GetQuestionsParams,
} from '@/actions/shared.types';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { connectToDatabase } from '@/lib/mongoose';

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create tags if they don't exist and add the question to the tag document if it does
    for (const tag of tags) {
      const escapedTag = tag.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${escapedTag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // Add the tags to the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create a interaction record for the users ask_question action
    // increament author's reputation by 5 for creating a question

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate('tags');

    if (!question) throw new Error('Question not found');

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
