import { signOut } from 'next-auth/client';
import withAuth from '@/helpers/withAuth';
import { Layout } from '@/components';

const ArticlesPage = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return (
    <Layout className="d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="title-xl">¡Bienvenido!</h1>
        <button className="button button--theme-primary" onClick={handleClick}>
          Log out
        </button>
      </div>
    </Layout>
  );
};

export default withAuth(ArticlesPage);
