import React from 'react';
import { EditorComponent, Layout } from '@/components';
import EditorContextProvider from '@/helpers/contexts/editorContext';

const VideoEditorPage = () => {
  return (
    <EditorContextProvider>
      <Layout>
        <EditorComponent option="onlyVideo" />
      </Layout>
    </EditorContextProvider>
  );
};

export default VideoEditorPage;
