import type { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  userId: string
  email: string
  password: string
  timezone: string
  name?: string
}
