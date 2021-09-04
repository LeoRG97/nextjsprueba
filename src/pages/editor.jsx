import React from 'react';
import EditorContextProvider from '@/helpers/contexts/editorContext';
import { EditorComponent, Layout } from '@/components';

const EditorPage = () => {
  return (
    <EditorContextProvider>
      <Layout>
        <EditorComponent />
      </Layout>
    </EditorContextProvider>
  );
};

export default EditorPage;
