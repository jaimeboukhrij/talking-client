'use client'
import Auth from '@/components/Auth/Auth'
import Chat from '@/components/Chat/Chat'
import NotChat from '@/components/NotChat/NotChat'
import { AuthContext } from '@/contexts/auth.context'
import { useContext } from 'react'

export default function Home () {
  const { userData } = useContext(AuthContext)
  return (
    <>
      <Auth />
      {userData &&
        <main className='mainLayout'>
          <NotChat />
          <Chat />
        </main>}
    </>
  )
}
