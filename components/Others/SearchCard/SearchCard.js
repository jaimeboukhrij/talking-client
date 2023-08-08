import { useContext, useEffect, useState } from 'react'
import styles from './SearchCard.module.css'
import userService from '@/services/user.service'
import { AuthContext } from '@/contexts/auth.context'
import Toast from '../Toast'
import showToast from '@/utils/showToast'
export default function SearchCard ({ userName, avatar, idUserReq }) {
  const { userData } = useContext(AuthContext)
  const [userInReq, setUserinReq] = useState()
  useEffect(() => {
    userData &&
    userService
      .User(idUserReq)
      .then(({ data }) => setUserinReq(data.request.some(elem => elem.userReq === userData._id)))
      .catch(e => console.log(e))
  }, [userInReq])

  const hanldeSendReq = () => {
    userService
      .Request(idUserReq)
      .then(() => {
        !userInReq ? showToast('Request send 😄') : showToast('Request deleted 😢', 'error')
        setUserinReq(null)
      })
      .catch(e => console.log(e))

    userService
      .PutRecentSearched(idUserReq)
      .catch(e => console.log(e))
  }

  return (
    <div className={styles.div}>
      <img src={avatar} />
      <article>
        <p>{userName}</p>
        <i
          class='bx bxs-user-plus bx-md'
          style={{ color: userInReq ? 'red' : 'black' }}
          onClick={hanldeSendReq}
        />
      </article>
      <Toast />
    </div>
  )
}
