import axios from './axios';

export const deleteInvitationService = async (idInvitation) => {
  try {
    const res = await axios().delete(`invitaciones/${idInvitation}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateInvitationService = async (idInvitation, data) => {
  try {
    const res = await axios().put(`invitaciones/${idInvitation}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};
