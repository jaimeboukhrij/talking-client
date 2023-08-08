import { AuthContext } from '@/contexts/auth.context'
import LogIn from './LogIn'
import SignUp from './SignUp'
import { useContext, useState } from 'react'

export default function Auth () {
  const [showModal, setModal] = useState('login')
  const { userData } = useContext(AuthContext)

  return (
    <>
      {showModal === 'login' && !userData && <LogIn setModal={setModal} />}
      {showModal === 'signup' && !userData && <SignUp setModal={setModal} />}
    </>
  )
}
