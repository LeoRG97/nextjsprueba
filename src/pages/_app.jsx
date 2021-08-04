import '@/global/styles/globals.css';
// import { useStore } from '@/store';
// import { Provider } from 'react-redux';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);

  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
