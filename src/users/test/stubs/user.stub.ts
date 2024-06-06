import { User } from 'src/schemas/user.schema';

export const userStub = (): User => {
  return {
    name: 'name one',
    email: 'test@example.com',
    password: 'password',
    role: 'agent',
  };
};
