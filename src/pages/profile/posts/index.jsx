import React from 'react';
import {
  Footer,
  Layout,
  ProfilePostsComponent,
  ProfilePostsOptionsComponent,
  TrendingSelectComponent,
  ArticlesListComponent,
} from '@/components';

const PostsProfile = () => {
  return (
    <Layout>
      <ProfilePostsComponent />
      <ProfilePostsOptionsComponent />
      <div className="selects-container">
        <div className="select-recent">
          <TrendingSelectComponent selectN="1" />
        </div>
        <div className="select-filter">
          <TrendingSelectComponent selectN="2-profile" />
        </div>
      </div>
      <ArticlesListComponent />
      <Footer />
    </Layout>
  );
};

export default PostsProfile;
