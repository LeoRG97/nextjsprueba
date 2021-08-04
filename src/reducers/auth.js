import Auth from './boilerplates/auth';

export const {
  reducer: auth,
  login,
  logout,
} = Auth('auth');
