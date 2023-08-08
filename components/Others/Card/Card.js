import styles from './Card.module.css'
export default function Card ({ userName, avatar, status }) {
  console.log(avatar)
  return (
    <div className={styles.div}>
      <img src={avatar} />
      <article>
        <p>{userName}</p>
        <p>{status}</p>
      </article>
    </div>
  )
}
