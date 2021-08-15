import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const withoutAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) {
    return <></>;
  }

  if (session) {
    router.replace('/articulos');
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default withoutAuth;
