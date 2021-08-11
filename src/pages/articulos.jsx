import { signOut } from 'next-auth/client';
import withAuth from '@/helpers/withAuth';

const ArticlesPage = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return (
    <div className="main-container">
      <h1 className="title-xl">¡Bienvenido!</h1>
      <button className="button button--theme-primary" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
};

export default withAuth(ArticlesPage);
