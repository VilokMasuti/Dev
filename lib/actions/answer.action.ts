'use server'

import Answer from '@/database/answer.model'
import { connectToDatabase } from '../mongoose'
import type { CreateAnswerParams, GetAnswersParams } from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase()
    const { content, author, question, path } = params
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    })

    await Question.findByIdAndUpdate(question, {
      $push: {
        answers: newAnswer._id,
      },
    })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase()
    const { questionId } = params
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 })

    return { answers }
  } catch (error) {
    console.log(error)
    throw error
  }
}
