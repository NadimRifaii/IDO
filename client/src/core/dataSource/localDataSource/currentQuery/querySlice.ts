import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../types/rootState";

type QuerySlice = {
  query: string
}
const initialState: QuerySlice = {
  query: ''
}

export const querySlice = createSlice({
  initialState,
  name: "query",
  reducers: {
    setQuery(prevState, { type, payload }: { type: string, payload: string }) {
      if (prevState && type) {

      }
      return {
        ...{ query: payload }
      }
    },
  }
})
export const { setQuery } = querySlice.actions
export const query = querySlice.name
export default querySlice.reducer
export const extractQuerySlice = (global: RootState) => {
  return global[query]
}