type Props = {
   message: string
}

const ErrorSpan = ({ message }: Props) => {
   return <span className='text-red-500 text-sm'>{message}</span>
}

export default ErrorSpan
