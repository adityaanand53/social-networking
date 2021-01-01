export interface User {
  id?: number;
  name?: string;
  email: string;
  username: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  introduction?: string;
}
export interface Posts {
  id: number;
  description: string;
  user: User;
  likedBy: any;
  published_at: string;
  created_at: string;
  updated_at: string;
  fileUrl: string;
  mediaContent: MediaContent[];
}

export interface PostFormData {
  description: string;
  likedBy: number[];
  fileUrl: string;
  user: number;
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

export interface LoginResponse {
  success: string;
  token: string;
  username: string;
  id: number;
}

export interface RegisterResponse {
  success: string;
}
