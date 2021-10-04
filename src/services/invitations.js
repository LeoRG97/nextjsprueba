import axios from './axios';
import { ApiRoutes } from '@/global/constants';

export const deleteInvitationService = async (idInvitation) => {
  try {
    const res = await axios().delete(`${ApiRoutes.Invitation}/${idInvitation}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateInvitationService = async (idInvitation, data) => {
  try {
    const res = await axios().put(`${ApiRoutes.Invitation}/${idInvitation}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
