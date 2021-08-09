import 'bootstrap/dist/css/bootstrap.css';
import '@/global/styles/globals.css';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
