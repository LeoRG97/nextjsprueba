import { CreateAccountForm } from '@/components';
import PreferencesForm from '@/components/createAccountForm/PreferencesForm';

import Head from 'next/head';

export default function CreateAccounst() {
  return (
    <div className="background-gray">
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <div className="main-container centered-content">
        <CreateAccountForm />
        <PreferencesForm />
      </div>
    </div>
  );
}
