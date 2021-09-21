import axios from './axios';

export const sendInvitationService = async (email, role) => {
  try {
    const res = await axios().post('email/send-invitation', {
      mailSend: email, role,
    });
    return res;
  } catch (err) {
    return err;
  }
};
