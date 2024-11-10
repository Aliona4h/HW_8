export type User = {
  id: string;
  username: string;
};

export type Comment = {
  id: string;
  text: string;
  user?: {
    id: string;
    username: string;
  };
};
export type CommentProps = {
  exhibitId: string;
  userId?: string;
  comments: Comment[];
  onAddComment: (commentText: string) => void;
  onDeleteComment: (commentId: string) => void;
};

export type Exhibit = {
  id: string;
  imageUrl: string;
  description: string;
  user: User;
  createdAt: string;
};

export type ExhibitCardProps = {
  exhibit: Exhibit;
  user: User | null;
  onRemove: (exhibitId: string) => void;
  onAddComment: (exhibitId: string, commentText: string) => void;
  onDeleteComment: (exhibitId: string, commentId: string) => void;
  comments: Comment[];
};

export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export type PostProps = {
  id: number;
  imageUrl: string;
  description: string;
  username: string;
  userId: number;
  commentCount: number;
};

export type ProtectedRouteProps = {
  children: JSX.Element;
  requiresAuth: boolean;
};
