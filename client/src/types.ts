export type AuthState = {
  user: User | null;
  accessToken: string | null;
};

export type User = {
  userId: boolean;
  userName: boolean;
  email: boolean;
  bio: boolean;
  notificationsEnabled: boolean;
  statusVisibility: boolean;
  avatar: boolean;
  createdAt: boolean;
  updatedAt: boolean;
  lastActive: boolean;
};
export type LoginUserReturnPayload = { user: User; accessToken: string };

export type FormField<T extends object> = {
  name: keyof T;
  placeholder: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
};
