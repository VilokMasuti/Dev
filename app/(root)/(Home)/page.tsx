import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar '
import Filter from '@/components/shared/Filter'

import { HomePageFilters } from '@/constants/filters'
import HomeFilter from '@/app/home/HomeFilter'
import NoResult from '@/components/shared/NoResult'
import QuestionCard from '@/components/Cards/QuestionCard'

const Home = () => {
  const questions = [
    {
      _id: '1',
      title: 'How to do a git commit?',
      author: {
        _id: '1',
        name: 'vilok',
        picture: 'https://example.com/profile1.jpg',
        clerkId: 'clerk_1',
      },
      views: 10,
      upvotes: ['upvote_1', 'upvote_2'], // List of user IDs who upvoted
      answers: [{ _id: 'answer_1', content: 'Use git commit -m' }], // Array of answers
      createdAt: new Date(Date.now() - 10 * 60000), // '10 minutes ago'
      tags: [
        { _id: '1', name: 'git' },
        { _id: '2', name: 'git commit' },
      ],
    },
    {
      _id: '2',
      title: 'What is the use of useState in React?',
      author: {
        _id: '2',
        name: 'john_doe',
        picture: 'https://example.com/profile2.jpg',
        clerkId: 'clerk_2',
      },
      views: 25,
      upvotes: ['upvote_3', 'upvote_4', 'upvote_5'],
      answers: [
        {
          _id: 'answer_2',
          content: 'It manages state in functional components.',
        },
      ],
      createdAt: new Date(Date.now() - 20 * 60000), // '20 minutes ago'
      tags: [
        { _id: '1', name: 'react' },
        { _id: '2', name: 'useState' },
      ],
    },
    {
      _id: '3',
      title: 'How does async/await work in JavaScript?',
      author: {
        _id: '3',
        name: 'jane_smith',
        picture: 'https://example.com/profile3.jpg',
        clerkId: 'clerk_3',
      },
      views: 50,
      upvotes: ['upvote_6', 'upvote_7', 'upvote_8', 'upvote_9'],
      answers: [
        {
          _id: 'answer_3',
          content: 'Async/await simplifies asynchronous code.',
        },
      ],
      createdAt: new Date(Date.now() - 30 * 60000), // '30 minutes ago'
      tags: [
        { _id: '1', name: 'javascript' },
        { _id: '2', name: 'async-await' },
      ],
    },
    {
      _id: '4',
      title: 'How to implement pagination in Next.js?',
      author: {
        _id: '1',
        name: 'vilok',
        picture: 'https://example.com/profile1.jpg',
        clerkId: 'clerk_1',
      },
      views: 18,
      upvotes: ['upvote_10', 'upvote_11'],
      answers: [
        {
          _id: 'answer_4',
          content: 'You can use getServerSideProps or API routes.',
        },
      ],
      createdAt: new Date(Date.now() - 15 * 60000), // '15 minutes ago'
      tags: [
        { _id: '1', name: 'next.js' },
        { _id: '2', name: 'pagination' },
      ],
    },
    {
      _id: '5',
      title:
        'What is the difference between var, let, and const in JavaScript?',
      author: {
        _id: '4',
        name: 'dev_expert',
        picture: 'https://example.com/profile4.jpg',
        clerkId: 'clerk_4',
      },
      views: 35,
      upvotes: ['upvote_12', 'upvote_13', 'upvote_14'],
      answers: [
        {
          _id: 'answer_5',
          content: 'var is function-scoped, let and const are block-scoped.',
        },
      ],
      createdAt: new Date(Date.now() - 25 * 60000), // '25 minutes ago'
      tags: [
        { _id: '1', name: 'javascript' },
        { _id: '2', name: 'es6' },
      ],
    },
  ]

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className=" mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No result found"
            description="  Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡                 "
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  )
}

export default Home
