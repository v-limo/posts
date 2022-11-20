export interface PostI {
  userId: number
  id: number
  title: string
  body: string
}
export type PostState = {
  posts: PostI[]
  filteredPosts: PostI[]
  loading: boolean
  error: boolean
  post: PostI | null
}

export type PostProps = {
  post: PostI
}

export type PostsProps = {
  posts: PostI[]
}
