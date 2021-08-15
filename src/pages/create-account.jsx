import Head from 'next/head';
// eslint-disable-next-line import/extensions
import { CreateAccountForm, LoginHeader } from '@/components';

export default function CreateAccounst() {
  return (
    <div className="background-gray">
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <LoginHeader />
      <div className="main-container centered-content">
        <CreateAccountForm />
      </div>
    </div>
  );
}
