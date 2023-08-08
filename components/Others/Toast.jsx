import 'react-toastify/dist/ReactToastify.css'
import { Slide, ToastContainer } from 'react-toastify'

export default function Toast () {
  return (
    <div>
      <ToastContainer transition={Slide} />
    </div>
  )
}
