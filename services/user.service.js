import axios from 'axios'

class UserService {
  constructor () {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`
    })
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
    })
  }

  User (userId) {
    return this.api.get(`/${userId}`)
  }

  RecentedSearched (userId) {
    return this.api.get(`/recentsearched/${userId}`)
  }

  PutRecentSearched (userSearchedId) {
    return this.api.put(`/recentsearched/${userSearchedId}`)
  }

  SerachUser (queryUser) {
    return this.api.get(`/searchuser/${queryUser}`)
  }

  Request (idUserReq) {
    return this.api.put(`/request/${idUserReq}`)
  }
}
const userService = new UserService()
export default userService
