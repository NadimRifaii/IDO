import { taskSlice } from "../dataSource/localDataSource/tasksSlice/tasksSlice"
import { User } from "./user"

export type RootState = {
  user: User,
  tasks: taskSlice,
  query: { query: string }
}