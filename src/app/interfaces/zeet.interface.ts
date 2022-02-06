export interface IZeet {
  id: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  by: {
    id: string;
    name: string;
    username: string;
    profileURL: string;
  };
}
