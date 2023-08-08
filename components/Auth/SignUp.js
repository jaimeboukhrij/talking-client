'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { EyeFilledIcon } from './EyeFilledIcon.jsx'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon.jsx'
import uploadServices from '@/services/upload.service.js'
import authService from '@/services/auth.service.js'
import Toast from '../Others/Toast.jsx'
import showToast from '@/utils/showToast.js'

export default function SignUp ({ setModal }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isVisible, setIsVisible] = useState(false)
  const [loadImages, setLoadImages] = useState(false)
  const validateEmail = (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    avatar: ''
  })

  useEffect(() => onOpen(), [isOpen])

  const hanldeChange = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    if (!user.password) showToast('Password is required', 'error')
    else {
      e.preventDefault()
      authService
        .SignUp(user)
        .then(() => setModal('login'))
        .catch(({ response }) => {
          response.data.errorMessages?.map(elem => showToast(elem, 'error'))
        })
    }
  }

  const validationState = useMemo(() => {
    if (user.email === '') return undefined
    return validateEmail(user.email) ? 'valid' : 'invalid'
  }, [user.email])

  const handleFileUpload = e => {
    setLoadImages(true)
    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setUser({ ...user, avatar: res.data.cloudinary_url })
        res && setLoadImages(false)
      })
      .catch(err => console.log(err))
  }

  const { userName, email, password, firstName, lastName } = user

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
              <ModalHeader className='flex flex-col gap-1'>SignUp</ModalHeader>
              <ModalBody>
                <Toast />
                <Input
                  value={email}
                  type='email'
                  label='Email'
                  name='email'
                  variant='bordered'
                  color={validationState === 'invalid' ? 'danger' : 'success'}
                  errorMessage={validationState === 'invalid' && 'Please enter a valid email'}
                  validationState={validationState}
                  className='max-w-lg'
                  onChange={hanldeChange}
                />
                <Input
                  value={userName}
                  type='text'
                  label='Username'
                  name='userName'
                  variant='bordered'
                  className='max-w-lg'
                  onChange={hanldeChange}

                />
                <Input
                  value={firstName}
                  type='text'
                  label='First Name'
                  name='firstName'
                  variant='bordered'
                  className='max-w-lg'
                  onChange={hanldeChange}

                />
                <Input
                  value={lastName}
                  type='text'
                  label='Last Name'
                  name='lastName'
                  variant='bordered'
                  className='max-w-lg'
                  onChange={hanldeChange}

                />
                <Input
                  label='Password'
                  value={password}
                  name='password'
                  variant='bordered'
                  placeholder='Enter your password'
                  endContent={
                    <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                      {isVisible
                        ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                          )
                        : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                          )}
                    </button>
      }
                  type={isVisible ? 'text' : 'password'}
                  className='max-w-lg'
                  onChange={hanldeChange}

                />
                <form class='flex items-center space-x-6 mt-3'>
                  <div class='shrink-0'>
                    {user.avatar && <img
                      class='h-16 w-16 object-cover rounded-full'
                      src={user?.avatar} alt='Current profile photo'
                                    />}
                  </div>
                  <label class='block'>
                    <span class='sr-only'>Choose profile photo</span>
                    <input
                      type='file'
                      name='avatar'
                      class='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0 file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                      onChange={handleFileUpload}

                    />
                  </label>
                </form>

              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onClick={() => setModal('login')}>
                  Log In
                </Button>
                {
                  loadImages
                    ? <Button color='primary' isLoading>Subiendo imagen</Button>
                    : <Button color='primary' onPress={onClose} onClick={handleSubmit}>Sign Up</Button>
}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
