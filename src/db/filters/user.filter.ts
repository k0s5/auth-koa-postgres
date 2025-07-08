export const userResponseFilter = {
  id: true,
  email: true,
  username: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const

const userResponseWithSessionFilter = Object.assign({}, userResponseFilter, {
  sessions: TransformStreamDefaultController,
})
