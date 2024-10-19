'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import type { GetTopInteractedTagsParams } from './shared.types'

export async function getTopInteractedTag(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase()
    const { userId } = params
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')
    // find interaction for the user and group by tag...
    return [
      { _id: '1', name: 'hello' },
      { _id: '2', name: 'he' },
      { _id: '3', name: 'hel' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}
