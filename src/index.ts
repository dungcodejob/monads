import {Monads} from './option';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const users: User[] = [
  {
    id: '1',
    firstName: 'Pham Van',
    lastName: 'Anh Dung',
  },
  {
    id: '2',
    firstName: 'Nguyen Cong',
    lastName: 'Thanh Loc',
  },
];

const userId = '1';
const user = Monads.just(userId)
  .map(id => users.find(item => item.id === id))
  .do(user => console.log(user))
  .get();
