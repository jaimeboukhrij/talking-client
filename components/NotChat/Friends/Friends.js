import Card from '@/components/Others/Card/Card'
import styles from './Friends.module.css'
import 'boxicons'
import group from '../../../assest/group.png'
import meetFriends from '../../../assest/meetFriends.png'
import { useContext } from 'react'
import { HeaderContext } from '@/contexts/header.context '
import { useDisclosure } from '@nextui-org/react'
import AddNewsFriends from './AddNewsFriends/AddNewsFriends'
export default function Friends () {
  const { setActivate } = useContext(HeaderContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <header className={styles.header}>
        <i class='bx bx-left-arrow-alt bx-md red' onClick={() => setActivate('chats')} />
        <h4>New Chat</h4>
      </header>
      <main className={styles.main}>
        <span>
          <Card userName='New Group' avatar={group.src} />
        </span>
        <span onClick={onOpen}>
          <Card userName='Meet new Friends' avatar={meetFriends.src} />
        </span>
      </main>
      <AddNewsFriends isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}
