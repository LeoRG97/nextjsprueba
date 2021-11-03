import React from 'react';
import { useRouter } from 'next/router';
import { AccordionComponent } from '@/components';

const ProfileTools = () => {
  const router = useRouter();
  return (
    <div className="container">
      <div className="d-flex justify-content-center justify-content-lg-end mb-4">
        <button
          onClick={() => router.push('/editor/tool')}
          className="button button--theme-primary"
        >
          Nueva herramienta
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <AccordionComponent isEditable />
        </div>
      </div>
    </div>
  );
};

export default ProfileTools;
