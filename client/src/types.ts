export type FormField<T> = {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "textarea";
  name: keyof T;
  isOptional?: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  bio: string;
  avatarFileId: string | null;
  registeredDate: string;
  lastLoginDate: string;
};

export type UserPayload = {
  user: Required<AuthState["user"]>;
  accessToken: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};
export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RefreshResponse = {
  user: User;
  accessToken: string;
};

export type FileResponse = {
  id: string;
  originalName: string;
  url: string;
  size: number;
  fileType: "IMAGE" | "VIDEO" | "AUDIO";
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type UploadFileRequest = {
  file: File;
};

export type UpdateFileRequest = {
  fileId: string;
  file: File;
};

export type DeleteFileResponse = {
  message: string;
};
