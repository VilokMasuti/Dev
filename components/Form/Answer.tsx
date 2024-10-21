/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'
import { AnswerSchema } from '@/lib/validations'

// Props interface defining the expected structure for the Answer component's props
interface Props {
  question: string // The question content (HTML or text)
  questionId: string // The ID of the question (used for creating an answer)
  authorId: string // The ID of the author (logged-in user) answering the question
}

const Answer = ({ question, questionId, authorId }: Props) => {
  // State to manage the form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingAI, setSetIsSubmittingAI] = useState(false) // For AI-generated answer functionality (optional)

  // Getting the current theme mode from the context (light/dark mode)
  const { mode } = useTheme()

  // Using a ref to manage TinyMCE editor instance
  const editorRef = useRef(null)

  // Retrieve the current path of the application (useful for redirecting or API calls)
  const pathname = usePathname()

  // React Hook Form setup using zod validation schema for form data validation
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '', // Initial value for the answer field
    },
  })

  // Function to handle the submission of the answer
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true) // Start the submission process

    try {
      // Creating the answer by calling the backend API
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId), // Convert authorId from string to object
        question: JSON.parse(questionId), // Convert questionId from string to object
        path: pathname, // Current path, helpful for context in the API
      })

      form.reset() // Reset the form fields after successful submission

      // Clear the TinyMCE editor content if the ref is available
      if (editorRef.current) {
        const editor = editorRef.current as any
        editor.setContent('') // Clear editor content
      }
    } catch (error) {
      console.error(error) // Log any errors for debugging
    } finally {
      setIsSubmitting(false) // End the submission process
    }
  }

  return (
    <div>
      {/* Heading and AI generation button (optional) */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        {/* Button to trigger AI-generated answers (currently disabled) */}
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={() => {}}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      {/* Form for submitting an answer */}
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)} // Form submit handler
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {/* TinyMCE Editor for rich text input */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY} // API key for TinyMCE
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor // Set the editor instance to the ref
                    }}
                    onBlur={field.onBlur} // Mark field as touched when editor is blurred
                    onEditorChange={(content) => field.onChange(content)} // Update form field when editor content changes
                    init={{
                      height: 350, // Height of the editor
                      menubar: false, // Disable the menubar for simplicity
                      plugins: [
                        // Plugins for additional features (e.g., lists, links, etc.)
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | codesample | bold italic forecolor | alignleft aligncenter |' +
                        'alignright alignjustify | bullist numlist', // Toolbar options for formatting
                      content_style:
                        'body { font-family:Inter; font-size:16px }', // Styling for the editor content
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide', // Skin based on current theme
                      content_css: mode === 'dark' ? 'dark' : 'light', // Content styling based on theme
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />{' '}
                {/* Validation error message */}
              </FormItem>
            )}
          />

          {/* Submit button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}{' '}
              {/* Button label based on submission state */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
