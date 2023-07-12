import Portal from '../Portal/Portal'

import React from 'react'

type Props = {
   children: React.ReactNode
   isOpen: boolean
}

const Modal = ({ children, isOpen }: Props) => {
   if (!isOpen) return null
   return <div className='w-full min-h-screen bg-bgOverlay z-40 fixed top-0 left-0'>{children}</div>
}

export default Modal
