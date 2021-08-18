import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Roles } from '@/global/constants';

const defaultRoles = [Roles.Admin, Roles.Author, Roles.Reviewer, Roles.User];

const withAuth = (WrappedComponent, roles = defaultRoles) => (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) {
    return <></>;
  }

  if (!session) {
    // si el usuario no tiene la sesión abierta, será enviado a Login
    router.replace('/login');
    return null;
  }

  if (!roles.find((role) => session.user.role === role)) {
    // si el usuario no tiene el rol requerido para acceder, no se le concederá el acceso
    router.back();
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
