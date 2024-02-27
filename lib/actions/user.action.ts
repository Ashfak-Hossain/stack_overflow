'use server';

import Question from '@/database/question.model';
import User from '@/database/user.model';
import {
  UserCreationError,
  UserDeletionError,
  UserNotFoundError,
  UserUpdateError,
} from '@/errors/User';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
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
    if (error instanceof UserNotFoundError) {
      console.error(error.name, error.message);
    } else {
      console.error('Unexpected error', error);
      throw error;
    }
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    if (error instanceof UserCreationError) {
      console.error(error.name, error.message);
    } else {
      console.error('Unexpected error', error);
      throw error;
    }
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
    if (error instanceof UserUpdateError) {
      console.error(error.name, error.message);
    } else {
      console.error('Unexpected error', error);
      throw error;
    }
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new UserNotFoundError('User not found');
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
    if (error instanceof UserDeletionError) {
      console.error(error.name, error.message);
    } else {
      console.error('Unexpected error', error);
      throw error;
    }
  }
}
