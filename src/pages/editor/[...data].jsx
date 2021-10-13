import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditorContextProvider from '@/helpers/contexts/editorContext';
import { EditorComponent, Layout, LoadingIndicator } from '@/components';
import withAuth from '@/helpers/withAuth';
import { Roles } from '@/global/constants';
import { fetchArticleById, fetchArticleContent } from '@/services/articles';

// page with catch-all-route
const BlogEditorPage = () => {
  const router = useRouter();
  const { data } = router.query;
  const [loading, setLoading] = useState(!!data[1]);
  const [article, setArticle] = useState({});
  const [articleContent, setArticleContent] = useState({});
  const [error, setError] = useState('');

  const getArticle = async () => {
    try {
      if (data[1]) {
        const res = await fetchArticleById(data[1]);
        const content = await fetchArticleContent(res._id);
        setArticle(res);
        setArticleContent(content);
        setLoading(false);
      }
    } catch (err) {
      setError('Artículo no encontrado');
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  const getOption = () => {
    switch (data[0]) {
      case 'video':
        return 'onlyVideo';
      case 'podcast':
        return 'onlyAudio';
      default:
        return '';
    }
  };

  const showContent = () => {
    if (loading) {
      return <div className="centered-content mt-5 pt-5"><LoadingIndicator /></div>;
    } if (error) {
      return <h3 className="text-center title mt-5 pt-5">Articulo no encontrado</h3>;
    }

    return (
      <EditorComponent
        initialData={article._id ? article : null}
        initialContent={articleContent.html ? articleContent : null}
        setInitialData={(obj) => setArticle({ ...article, ...obj })}
        option={getOption()}
      />
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

export default withAuth(BlogEditorPage, [Roles.Admin, Roles.Author, Roles.Reviewer]);
