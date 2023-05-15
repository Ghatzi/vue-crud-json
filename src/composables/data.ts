import { TableColumns } from '../types/index';

export const columns: TableColumns[] = [
  {
    id: 'username',
    friendlyName: 'username',
    sortType: 'string'
  },
  {
    id: 'firstName',
    friendlyName: 'first name',
    sortType: 'string'
  },
  {
    id: 'lastName',
    friendlyName: 'last name',
    sortType: 'string'
  },
  {
    id: 'isAdmin',
    friendlyName: 'is admin',
    sortType: 'string'
  },
  {
    id: 'createdDate',
    friendlyName: 'created date',
    sortType: 'date'
  },
  {
    id: 'updatedDate',
    friendlyName: 'updated date',
    sortType: 'date'
  }
];
