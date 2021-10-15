import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, LoadingIndicator, ToolEditorComponent } from '@/components';
import ToolContextProvider from '@/helpers/contexts/toolContext';
import { fetchToolById, fetchToolContent } from '@/services/tools';
import withAuth from '@/helpers/withAuth';
import { Roles } from '@/global/constants';

const ToolEditor = () => {
  const router = useRouter();
  // console.log(router);
  const { data } = router.query;
  const [tool, setTool] = useState({});
  const [toolContent, setToolContent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(data && data[0]);

  const getTool = async () => {
    try {
      if (data[0]) {
        const res = await fetchToolById(data[0]);
        const content = await fetchToolContent(res._id);
        setTool(res);
        setToolContent(content);
        setLoading(false);
      }
    } catch (err) {
      setError('Herramienta no encontrada');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && data[0] !== 'new') {
      getTool();
    }
  }, [data]);

  const showContent = () => {
    if (loading) {
      return <div className="centered-content mt-5 pt-5"><LoadingIndicator /></div>;
    } if (error) {
      return <h3 className="text-center title mt-5 pt-5">{error}</h3>;
    }

    return (
      <ToolEditorComponent
        initialData={tool}
        setInitialData={(newData) => setTool({ ...tool, ...newData })}
        initialContent={toolContent}
        setInitialContent={setToolContent}
      />
    );
  };

  return (
    <ToolContextProvider>
      <Layout>
        {showContent()}
      </Layout>
    </ToolContextProvider>
  );
};

export default withAuth(ToolEditor, [Roles.Admin, Roles.Author, Roles.Reviewer]);
