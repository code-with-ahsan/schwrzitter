export interface IZeet {
  id: number;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  by: {
    id: number;
    name: string;
    username: string;
    profileURL: string;
  };
}
