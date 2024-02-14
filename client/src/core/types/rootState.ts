import { Task } from "./task"
import { User } from "./user"

export type RootState = {
  user: User,
  tasks: Task[]
}