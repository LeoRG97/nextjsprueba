import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) {
    return <></>;
  }

  if (!session) {
    router.replace('/login');
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
