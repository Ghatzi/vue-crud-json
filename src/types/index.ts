export interface Users {
  id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName: string;
  isAdmin: boolean;
  createdDate?: Date;
  updatedDate: Date;
}

export interface TableColumns {
  id: string;
  friendlyName: string;
  sortType: string;
}
