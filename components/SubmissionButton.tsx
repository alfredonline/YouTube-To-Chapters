"use client"
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface SubmissionButtonProps {
    text: string
}

const SubmissionButton = ({ text }: SubmissionButtonProps) => {

    const { pending } = useFormStatus()


  return (
    <Button
        className='w-min'
    >
        {pending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : text}
    </Button>
  )
}

export default SubmissionButton