import Question from '@/components/Form/Question'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className=" h1-bold  text-dark_100_light900">Ask a Question</h1>
      <div className=" mt-9">
        <Question />
      </div>
    </div>
  )
}

export default page
