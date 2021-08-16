/* eslint-disable import/extensions */
import Head from 'next/head';
import { CreateAccountForm, LoginHeader } from '@/components';
import { getPreferencesService } from '@/services/preferences';

const CreateAccounst = ({ preferences }) => {
  return (
    <div className="background-gray">
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <LoginHeader />
      <div className="main-container centered-content">
        <CreateAccountForm preferences={preferences.data} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const preferences = await getPreferencesService();
  return {
    props: {
      preferences,
    },
  };
}

export default CreateAccounst;
