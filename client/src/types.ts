export type GenericFormField = {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "textarea";
  name: string;
  isOptional?: boolean;
};
export type FormField<T> = {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "textarea";
  name: keyof T;
  isOptional?: boolean;
  value?: string | number;
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
  file: File;
};

export type DeleteFileResponse = {
  message: string;
};

export type BaseUser = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  lastLoginDate: string;
  registeredDate: string;
  avatarFileId: string | null;
  bio: string | null;
};

export type UpdateUserRequest = {
  email?: string;
  password: string; // Current password for authentication
  newPassword?: string;
  bio?: string;
  avatarFileId?: string;
};

export type UpdateUserResponse = BaseUser;

export type GetUserByIdResponse = {
  id: string;
  userName: string;
  avatarFileId: string | null;
  bio: string | null;
};
