import { validateEmail } from '@/helpers/validateEmail';

export const loginValidation = ({
  email, password,
}) => {
  const errors = {
    isValid: true,
  };

  if (!email || !validateEmail(email)) {
    errors.email = 'Introduce una dirección de correo válida';
    errors.isValid = false;
  }

  if (!password) {
    errors.password = 'La contraseña es requerida';
    errors.isValid = false;
  }

  return errors;
};
