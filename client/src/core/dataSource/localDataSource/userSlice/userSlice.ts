import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user";
import { RootState } from "../../../types/rootState";

const initialState: User = {
  userName: '',
  email: ''
}
export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser(prevState, { type, payload }: { type: string, payload: User }) {
      return {
        ...payload
      }
    },
    removeUser(prevState, { type, payload }: { type: string, payload: User }) {
      if (type) {

      }
      return {
        ...initialState
      }
    }
  }
})
export const { setUser, removeUser } = userSlice.actions
export const user = userSlice.name
export default userSlice.reducer
export const extractUserSlice = (global: RootState) => {
  return global[user]
}