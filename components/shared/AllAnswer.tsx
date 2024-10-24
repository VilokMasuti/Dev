import React from 'react'
import Filter from './Filter'
import { AnswerFilters } from '@/constants/filters'
import { getAnswers } from '@/lib/actions/answer.action'
import Link from 'next/link'
import Image from 'next/image'
import { getTimestamp } from '@/lib/utils'
import ParseHTML from './ParseHTML '
import Voteing from './Voteing'
interface Props {
  questionId: string
  userId: string
  totalAnswers: number
}
const AllAnswer = async ({ questionId, userId, totalAnswers }: Props) => {
  const result = await getAnswers({ questionId })
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>

                  <p className="small-regular ml-2 text-light400_light500  mt-0.5 line-clamp-1">
                    answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end"></div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Voteing />
      </div>
    </div>
  )
}

export default AllAnswer
