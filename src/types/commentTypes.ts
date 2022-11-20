export interface CommentI {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type CommentsState = {
  loading: boolean
  error: boolean
  comments: CommentI[]
  filteredComments: CommentI[]
  comment: CommentI | null
}
