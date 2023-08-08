import { toast } from 'react-toastify'

const showToast = (message, toastType) => {
  toast.success(message, {
    position: 'bottom-right', // Optional: Set the position of the toast
    autoClose: 2000, // Optional: Set the duration in milliseconds (default: 5000)
    hideProgressBar: false, // Optional: Show or hide the progress bar (default: false)
    closeOnClick: true, // Optional: Close the toast when clicked (default: true)
    pauseOnHover: true, // Optional: Pause the timer when hovering over the toast (default: true)
    draggable: true,
    type: toastType,
    theme: 'colored'
  })
}

export default showToast
