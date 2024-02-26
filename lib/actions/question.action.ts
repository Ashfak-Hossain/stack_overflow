'use server';

import { connectToDatabase } from '../mongoose';

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log('Error creating question', error);
  }
}
