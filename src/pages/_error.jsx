/* eslint-disable no-nested-ternary */
import { ErrorPageComp } from '@/components';

function Error({ statusCode }) {
  return (
    <>
      {statusCode
        ? <ErrorPageComp statusCode={statusCode} />
        : <ErrorPageComp />}
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
