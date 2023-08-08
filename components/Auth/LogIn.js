'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react'
import MailFilledIcon from './MailIcon.jsx'
import LockIcon from './LockIcon.jsx'
import { useContext, useEffect, useState } from 'react'
import authService from '@/services/auth.service.js'
import { AuthContext } from '../../contexts/auth.context'

export default function LogIn ({ setModal }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  useEffect(() => onOpen(), [isOpen])
  const { authenticateUser, storeToken, userData } = useContext(AuthContext)
  console.log(userData)

  const handleChange = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authService
      .LogIn(user)
      .then(({ data }) => {
        storeToken(data.authToken)
        authenticateUser()
        userData && setModal('')
      })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        hideCloseButton='false'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                  }
                  label='Email'
                  name='email'
                  onChange={handleChange}
                  placeholder='Enter your email'
                  variant='bordered'
                />
                <Input
                  endContent={
                    <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                  }
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  variant='bordered'
                />
                <div className='flex py-2 px-1 justify-between'>
                  <Checkbox
                    classNames={{
                      label: 'text-small'
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onClick={() => setModal('signup')}>
                  Sign up
                </Button>
                <Button color='primary' onPress={onClose} onClick={handleSubmit}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
