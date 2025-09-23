export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
  DELIVERY_MAN = "DELIVERY_MAN",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  defaultAddress?: string;
  phone?: string;
  picture?: string;
  role: Role;
  isVerified?: boolean;
  isActive?: IsActive;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  avatar: string;
}

export type IUserParams = Partial<Omit<IUser, "isActive" | "role">> & {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  isActive?: IsActive[];
  role?: Role[];
};
