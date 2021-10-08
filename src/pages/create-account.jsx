/* eslint-disable import/extensions */
import Head from 'next/head';
import { CreateAccountForm, LoginHeader } from '@/components';
import { getPreferencesService } from '@/services/preferences';
import withoutAuth from '@/helpers/withoutAuth';

const CreateAccount = ({ preferences }) => {
  return (
    <div className="main-auth">
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <LoginHeader mainBackg="main-tranps" />
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

export default withoutAuth(CreateAccount);
