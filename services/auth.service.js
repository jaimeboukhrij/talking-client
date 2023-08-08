import axios from 'axios'

class AuthService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`
    })
  }

  SignUp (userData) {
    return this.api.post('/signup', userData)
  }

  LogIn (userData) {
    return this.api.post('/login', userData)
  }

  verify (token) {
    return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
  }
}

const authService = new AuthService()
export default authService
