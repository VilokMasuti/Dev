import Question from '@/components/Form/Question'
import { getUserByID } from '@/lib/actions/user.actions'

import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  // const { userId } = auth()
  const userId = 'clerk123'
  if (!userId) redirect('/sign-in')
  const mongoUser = await getUserByID({ userId })
  console.log(mongoUser)

  return (
    <div>
      <h1 className=" h1-bold  text-dark_100_light900">Ask a Question</h1>
      <div className=" mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default page
