import React from 'react';
import { EditorComponent, Layout } from '@/components';
import EditorContextProvider from '@/helpers/contexts/editorContext';

const AudioEditorPage = () => {
  return (
    <EditorContextProvider>
      <Layout>
        <EditorComponent option="onlyAudio" />
      </Layout>
    </EditorContextProvider>
  );
};

export default AudioEditorPage;
