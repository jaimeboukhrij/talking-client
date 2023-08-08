import { useContext } from 'react'
import Friends from './Friends/Friends'
import Profile from './Profile/Profile'
import { HeaderContext } from '@/contexts/header.context '
import Conversation from './Conversation/Conversation'
import styles from './NotChat.module.css'

export default function NotChat () {
  const { activate } = useContext(HeaderContext)
  return (
    <section className={styles.section}>
      {activate === 'chats' && <Conversation />}
      {activate === 'friends' && <Friends />}
      {activate === 'profile' && <Profile />}
    </section>
  )
}
