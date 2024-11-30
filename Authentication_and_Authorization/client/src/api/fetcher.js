import axios from 'axios'

export const login = async (endPoint, reqBody) => {
  const res = await axios.post(`http://localhost:4000${endPoint}`,reqBody)
  return res.data
}