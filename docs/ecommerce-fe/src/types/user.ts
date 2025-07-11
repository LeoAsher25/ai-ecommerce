export interface IProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  avatar: string
}

export interface ILoginPayload {
  email: string
  password: string
}
