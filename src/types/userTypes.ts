export interface UserI {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export type UsersState = {
  loading: boolean
  error: boolean
  users: UserI[]
  filteredUsers: UserI[]
  user: UserI | null
}

export type UserProps = {
  user: UserI
}

export type UsersProps = {
  users: UserI[]
}
