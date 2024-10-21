/* eslint-disable @typescript-eslint/no-explicit-any */

// Import necessary modules, components, and utility functions
import { getQuestionById } from '@/lib/actions/questions.action' // Function to fetch question details by ID
import Image from 'next/image' // Next.js Image component for optimized image handling
import Link from 'next/link' // Next.js Link component for internal navigation
import React from 'react' // React framework
import Metric from '@/components/shared/Metric' // Custom Metric component to display question details (views, answers, etc.)
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils' // Utility functions for formatting numbers and timestamps
import ParseHTML from '@/components/shared/ParseHTML ' // Component to safely parse and render HTML content
import RenderTag from '@/components/shared/RanderTag' // Component to render individual tags
import Answer from '@/components/Form/Answer' // Form component for submitting an answer to a question
import { auth } from '@clerk/nextjs/server' // Clerk authentication for server-side user verification
import { getUserByID } from '@/lib/actions/user.actions' // Function to fetch user details from MongoDB by user ID
import AllAnswer from '@/components/shared/AllAnswer'

// The main function for the page component; this is a Next.js server-side component
const page = async ({ params }: any) => {
  // Fetch question details based on the question ID from the URL params
  const result = await getQuestionById({ questionId: params.id })

  // Get the userId of the currently authenticated user (from Clerk authentication)
  const { userId: clerkId } = auth()

  // Initialize a variable to store MongoDB user details (if available)
  let mongoUser
  if (clerkId) {
    // Fetch user details from MongoDB if the Clerk userId exists (logged-in user)
    mongoUser = await getUserByID({ userId: clerkId })
  }

  // Render the JSX for the page content
  return (
    <>
      {/* Container for the question header */}
      <div className="flex-start w-full flex-col">
        {/* Header section with author information and potential action buttons */}
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          {/* Link to the author's profile */}
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-3"
          >
            {/* Display author's profile picture */}
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            {/* Display author's name */}
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end"></div>
        </div>

        {/* Display the question title */}
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      {/* Metrics section to display information like the timestamp, number of answers, and views */}
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        {/* Metric to display when the question was asked */}
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`} // Convert timestamp to readable format
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />

        {/* Metric to display the number of answers */}
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)} // Format the number of answers
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />

        {/* Metric to display the number of views */}
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)} // Format the number of views
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      {/* Display the content of the question by parsing the HTML */}
      <ParseHTML data={result.content} />

      {/* Render the tags associated with the question */}
      <div className=" mt-8 flex flex-wrap gap-3">
        {/* Loop through the tags and render each one */}
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id} // Each tag needs a unique key for efficient rendering
            _id={tag._id}
            name={tag.name}
            showCount={false} // Optionally hide or show count of related questions with this tag
          />
        ))}
      </div>
      {/* AllAnswer form component for showing all answer in ui*/}
      <AllAnswer
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
      />

      {/* Answer form component for submitting a new answer to the question */}
      <Answer
        question={result.content} // Pass the question content
        questionId={JSON.stringify(result._id)} // Convert question ID to string for form submission
        authorId={JSON.stringify(mongoUser?._id)} // If logged in, pass the MongoDB user ID of the author
      />
    </>
  )
}

export default page
