import { Roles } from '@/global/constants';

export const adminAccess = (role) => {
  return role === Roles.Admin;
};

export const reviewerAccess = (role) => {
  return role === Roles.Admin || role === Roles.Reviewer;
};

export const authorAccess = (role) => {
  return (role === Roles.Admin || role === Roles.Reviewer || role === Roles.Author);
};

export const vipUserAccess = (role) => {
  return (role === Roles.Admin
    || role === Roles.Reviewer
    || role === Roles.Author
    || role === Roles.Premium);
};

export const userAccess = (role) => {
  return (role === Roles.Admin
    || role === Roles.Reviewer
    || role === Roles.Author
    || role === Roles.Premium
    || role === Roles.User);
};
