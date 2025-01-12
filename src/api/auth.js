import axios from "axios";

const API_URL = "https://conduit-realworld-example-app.fly.dev/api";

export const loginUser = async (email, password) => {
   try {
      const response = await axios.post(`${API_URL}/users/login`, {
         user: {email, password}
      })
      return response.data;

   } catch (error) {
      throw error.response?.data || {errors: {message: 'something went wrong'}}

   }
}

export const registerUser = async (username, email, password) => {
   try {
      const response = await axios.post(`${API_URL}/users`, {
         user: {username, email, password}
      })
      return response.data

   } catch (error) {
      throw error.response?.data || {errors: {message: 'something went wrong'}}

   }
}
