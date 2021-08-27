import React from 'react';
import { EditorComponent, Layout } from '@/components';

const AudioEditorPage = () => {
  return (
    <Layout>
      <EditorComponent option="onlyAudio" />
    </Layout>
  );
};

export default AudioEditorPage;
