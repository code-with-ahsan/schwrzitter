export interface IZeet {
  id: string;
  content: string;
  likedBy: string[];
  commentedBy: string[];
  createdAt: string;
  by: {
    id: string;
    name: string;
    username: string;
    profileURL: string;
  };
  liked?: boolean;
  commented?: boolean;
}
