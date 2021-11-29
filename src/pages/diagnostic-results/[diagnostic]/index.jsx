import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditorContextProvider from '@/helpers/contexts/editorContext';
import {
  Layout, LoadingIndicator,
} from '@/components';
import DiagnosticResultsComponent from '@/components/thinkTools/diagnostic/DiagnosticResultsComponent';
import { fetchDiagnosticById } from '@/services/diagnostic';
import withAuth from '@/helpers/withAuth';

const DiagnosticResultsPage = () => {
  const router = useRouter();
  const { diagnostic } = router.query;
  const [diagnosticId, setDiagnosticId] = useState('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});
  const [error, setError] = useState('');

  const getResultsDiagnostic = async () => {
    try {
      if (diagnostic !== undefined) {
        const res = await fetchDiagnosticById(diagnostic);
        setDiagnosticId(res._id);
        setResults(res);
        setLoading(false);
      }
    } catch (err) {
      setError('Artículo no encontrado');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (diagnostic !== undefined && diagnosticId !== diagnostic) {
      getResultsDiagnostic();
    }
  }, [diagnostic]);

  const showContent = () => {
    if (loading) {
      return <div className="centered-content mt-5 pt-5"><LoadingIndicator /></div>;
    } if (error) {
      return <h3 className="text-center title mt-5 pt-5">Resultados no encontrados</h3>;
    }

    return (
      <DiagnosticResultsComponent diagnostic={results} />
    );
  };

  return (
    <EditorContextProvider>
      <Layout>
        {showContent()}
      </Layout>
    </EditorContextProvider>
  );
};
export default withAuth(DiagnosticResultsPage);
