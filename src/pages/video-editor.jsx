import React from 'react';
import { EditorComponent, Layout } from '@/components';

const VideoEditorPage = () => {
  return (
    <Layout>
      <EditorComponent option="onlyVideo" />
    </Layout>
  );
};

export default VideoEditorPage;
