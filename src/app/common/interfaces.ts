export interface User {
  id?: number;
  name?: string;
  email: string;
  username: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  introduction?: string;
  friendId: number;
}

export interface Posts extends CommonDataFields {
  description: string;
  user: User;
  likedBy: any;
  fileUrl: string;
  // mediaContent: MediaContent[];
}

export interface CommonDataFields {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostFormData {
  description: string;
  likedBy: LikedBy;
  fileUrl: string;
  user: number;
}

export interface LikedBy {
  [key: number]: boolean;
}

export interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}



export interface MediaFormat {
  thumbnail: Format;
  small: Format;
}

export interface MediaContent {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: MediaFormat;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ErrorResponse {
  message: string;
}

export interface LoginResponse extends ErrorResponse {
  success: string;
  token: string;
  username: string;
  id: number;
}

export interface RegisterResponse extends ErrorResponse {
  success: string;
}

export interface AddFriendResponse extends ErrorResponse {
  data: CommonDataFields;
  success: string;
}
