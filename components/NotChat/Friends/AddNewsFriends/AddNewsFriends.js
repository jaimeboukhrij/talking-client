'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Input } from '@nextui-org/react'
import { SearchIcon } from '@/components/Others/Card/SearchIcon'
import styles from './AddNewsFriends.module.css'
import { AuthContext } from '@/contexts/auth.context'
import userService from '@/services/user.service'
import SearchCard from '@/components/Others/SearchCard/SearchCard'

export default function AddNewsFriends ({ isOpen, onClose }) {
  const { userData } = useContext(AuthContext)
  const [recentUser, setRecentUser] = useState()
  const [findUsers, setFindUSers] = useState()
  const [queryUser, setQueryUser] = useState('')
  useEffect(() => {
    if (userData && isOpen) {
      setQueryUser('')
      userService
        .RecentedSearched(userData._id)
        .then(({ data }) => setRecentUser(data.searchedFriends))
        .catch(e => console.log(e))
    }
  }, [isOpen])

  useEffect(() => {
    if (queryUser !== '') {
      userService
        .SerachUser(queryUser)
        .then(({ data }) => setFindUSers(data))
        .catch(e => console.log(e))
    } else {
      userService
        .RecentedSearched(userData._id)
        .then(({ data }) => setRecentUser(data.searchedFriends))
        .catch(e => console.log(e))
    }
  }, [queryUser])

  const handleSearchUser = (e) => {
    const { value } = e.target
    setQueryUser(value)
  }

  return (

    <Modal
      size='md'
      isOpen={isOpen}
      onClose={onClose}
      placement='top'
    >
      <ModalContent style={{ height: '70vh' }}>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 mb-5' />
            <ModalBody className={styles.body}>
              <Input
                onChange={handleSearchUser}
                classNames={{
                  base: 'max-w-full sm:max-w-[40rem] h-10',
                  input: 'text-small',
                  inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
                }}
                placeholder='Type to search...'
                size='sm'
                startContent={<SearchIcon size={18} />}
                type='search'
              />

              {queryUser === ''
                ? <>
                  <h3>Recent searches...</h3>
                  {
                recentUser?.map(({ userName, avatar, _id }) => <SearchCard
                  userName={userName}
                  avatar={avatar}
                  key={userName}
                  idUserReq={_id}
                  setRecentUser={setRecentUser}
                                                               />)
                  }
                </>

                : <>
                  <h3>Results...</h3>
                  {
              findUsers?.map(({ userName, avatar, _id }) => <SearchCard
                userName={userName}
                avatar={avatar}
                key={userName}
                idUserReq={_id}
                setRecentUser={setRecentUser}

                                                            />)
                }
                </>}

            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>

  )
}
