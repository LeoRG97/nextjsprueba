/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { BASE_URL } from '@/global/constants';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      const res = await axios.post(`${BASE_URL}auth/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      const { data } = res;
      if (data.token) {
        return data;
      }
      return null;
    },
  }),
];

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token.refreshToken = user.token.refreshToken;
      token.accessToken = `${user.token.tokenType} ${user.token.accessToken}`;
      token.accessTokenExpires = user.token.expiresIn;
      token.user = user.user;
    }
    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user = token.user;
    return session;
  },
};

const pages = {
  signIn: '/login',
};

const options = {
  providers,
  pages,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
