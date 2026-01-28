export interface CommentType {
  id?: string;
  content?: string;
  authorId?: string;
  postId?: string;
  parentId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  replies?: [];
}
