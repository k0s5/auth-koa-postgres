export interface IUser {
  id: string
  email: string
  username: string
  passwordHash: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
