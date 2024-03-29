'use server';

import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from './shared.types';

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line no-unused-vars
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      '_id'
    );

    await Question.deleteMany({ author: user._id });

    // ! Todo: delete user's answers and comments

    const deletedUser = await User.findOneAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id, name' },
        { path: 'author', model: User, select: '_id, name, picture' },
      ],
    });

    if (!user) throw new Error('User not found');

    const savedQuestion = user.saved;

    return { questions: savedQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error('User not found');

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture');

    return { questions: userQuestions, totalQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswer(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswer = await Answer.countDocuments({ author: userId });

    const userAnswer = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture');

    return { answers: userAnswer, totalAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
